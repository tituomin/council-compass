import json
import requests
import requests_cache
from pprint import pprint

requests_cache.install_cache('test')


def get_meetings():
    resp = requests.get('https://dev.hel.fi/paatokset/v1/meeting/?policymaker__slug=kvsto&limit=1000')
    data = resp.json()['objects']
    # Filter only latest meetings with minutes
    meetings = [(x['year'], x['number']) for x in data if x['year'] >= 2013 and x['minutes']]
    meetings.sort()
    return meetings


def get_cases(year, number):
    url = f'https://datapumppu.helsinkikanava.fi/archive/kvsto-{year}-{number}/fi'
    print(url)
    resp = requests.get(url)
    data = resp.json()

    metadata = {x['contents']['issue_id']: x['contents'] for x in data if x['type'] == 'metadata'}

    cases = {x['_id']: x['contents'] for x in data if x['type'] == 'issue'}
    for case_id, case in cases.items():
        case.update(metadata.get(case_id, {}))
        case['discussions'] = []
        case['vote_events'] = []

    vote_events = [x['contents'] for x in data if x['type'] == 'voting']
    for vote_event in vote_events:
        case = cases[vote_event['issue_id']]
        case['vote_events'].append(vote_event)

    discussions = [x['contents'] for x in data if x['type'] == 'statements']
    for discussion in discussions:
        case = cases[discussion['issue_id']]
        case['discussions'].append(discussion['list'])

    return cases


meetings = get_meetings()

all_cases = {}
for year, number in meetings:
    cases = get_cases(year, number)
    for case_id, case in cases.items():
        if case_id not in all_cases:
            all_cases[case_id] = case
            continue

        if case['discussions']:
            all_cases[case_id]['discussions'].append(case['discussions'])
        if case['vote_events']:
            all_cases[case_id]['vote_events'].append(case['vote_events'])


for case in all_cases.values():
    case['total_speeches'] = sum([len(d) for d in case['discussions']])


sorted_cases = sorted(all_cases.values(), key=lambda x: x['total_speeches'], reverse=True)
for case in sorted_cases[0:100]:
    if 'register_id' not in case:
        continue
    print('%d %s %s %s' % (case['total_speeches'], case['register_id'], case['start_time'][0:10], case['title']))
    #for vote_event in case['vote_events']:
    #    if vote_event['type'] == 'PON':
    #        continue
    #    print('\t%s: %s / %s' % (vote_event['type_text'], vote_event['for_title'], vote_event['against_title']))
    #    d = vote_event.copy()
    #    del d['votes']
    #    pprint(d)


chosen_votes = [
    ('583801197c6d17175722ee22', 22),  # Guggenheim
    ('5719dc5de90857870339f144', 6),   # Hämeentie
    ('55804a403e29c95059b92497', 2),   # Keskustakirjasto
    ('584a76192510f9a23d584023', 1),   # Länsimetron asiakirjojen julkisuus
    ('57440c5d9805a5a173b100d9', 8),   # Vegaaniruokakokeilu päiväkodeissa
    ('55804a3e3e29c95059b921c1', 1),   # Talin golfkenttä asumiskäyttöön
    ('55804a3b3e29c95059b91b7b', 1),   # Kerjäämiskielto
    ('57bffa890c184cfb5701f15a', 1),   # Kruunusillat
    ('55804a403e29c95059b92574', 5),   # Malmin lentokenttä
    ('55804a3c3e29c95059b91c60', 2),   # Jätkäsaaren tornihotelli
]

output_data = []
for case_id, vote_nr in chosen_votes:
    case = all_cases.get(case_id)
    vote_event = None
    for vote in case['vote_events']:
        if vote['number'] == vote_nr:
            vote_event = vote
    data = case.copy()
    del data['discussions']
    data['vote_event'] = vote_event
    del data['vote_events']
    output_data.append(data)

s = json.dumps(output_data, ensure_ascii=False, indent=4)
f = open('cases.json', 'w')
f.write(s)
f.close()
