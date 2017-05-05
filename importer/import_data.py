import csv
import json
import requests
import requests_cache
from lxml import etree, html
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
people = {}

for year, number in meetings:
    cases = get_cases(year, number)
    for case_id, case in cases.items():
        if case['vote_events']:
            for v in case['vote_events'][0]['votes']:
                person = {'name': v['name'], 'party': v['party']}
                people[v['name']] = person

        if case_id not in all_cases:
            all_cases[case_id] = case
            continue

        if case['discussions']:
            all_cases[case_id]['discussions'].append(case['discussions'])
        if case['vote_events']:
            all_cases[case_id]['vote_events'].append(case['vote_events'])

for p in people.values():
    name = p['name'].replace('ä', 'a').replace('ö', 'o').replace('å', 'a').replace('é', 'e')
    print(name)
    url = f'http://www.hel.fi/www/helsinki/fi/kaupunki-ja-hallinto/paatoksenteko/kaupunginvaltuusto/jasenet/{name}'
    resp = requests.get(url)
    if resp.status_code != 200:
        continue
    root = html.fromstring(resp.content, base_url=url)
    root.make_links_absolute(url)
    img_list = root.cssselect('#kuva img')
    if not len(img_list):
        continue
    p['portrait_url'] = img_list[0].attrib['src']


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

EDIT_DATA = """Pitäisikö Helsinkiin rakentaa Guggenheim-museo osittain julkisin varoin?    
Pitäisikö Hämeentien läpiajoa rajoittaa henkilöautoilta?    
Pitäisikö Helsinkiin rakentaa Keskustakirjasto? 
Pitäisikö Länsimetro Oy:n hallituksen päätösasiakirjojen olla julkisia? x
Pitäisikö järjestää kokeilu, jossa osassa Helsingin päiväkodeista tarjotaan vegaaninen ruokavaihtoehto? 
Pitäisikö Talin golfkentän tilalle rakentaa asuntoja?   x
Pitäisikö kerjääminen kieltää Helsingin yleisillä alueilla? x
Pitäisikö rakentaa raitiotieyhteys keskustasta Laajasaloon (Kruunusillat-hanke)?    
Pitäisikö Malmin lentoasemalla säilyttää ilmailutoiminta?   x
Pitäisikö Jätkäsaareen rakentaa tornihotelli?   """

questions = [(x.rstrip(' x'), (1, -1)[x[-1] == 'x']) for x in EDIT_DATA.split('\n')]

f = open('votes.csv', 'w')
writer = csv.writer(f)

output_data = []
for idx, (case_id, vote_nr) in enumerate(chosen_votes):
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
    data['user_question'] = questions[idx][0]
    data['vote_map'] = questions[idx][1]

    row = [
        data['register_id'], data['title'], data['proposal'], vote_event['type_text'],
        vote_event['for_title'], vote_event['for_text'], vote_event['against_title'], vote_event['against_text']
    ]
    writer.writerow(row)

s = json.dumps(output_data, ensure_ascii=False, indent=4)
f = open('cases.json', 'w')
f.write(s)
f.close()


s = json.dumps(people, ensure_ascii=False, indent=4)
f = open('people.json', 'w')
f.write(s)
f.close()
