R = require 'ramda'

###
data =
	motions:
		guggis_kamu:
			text: "Kannatan Guggenheimin rakentamista"
			organization_id: "kansanmuisti"
		guggis_valtuusto:
			text: "Esitys blah blah blah"
			organization_id: "hel_council"
	
	persons:
		user1:
			name: "Just A. User"
		rep1:
			name: "Generic Representative 1"
		rep2:
			name: "Generic Representative 2"

	
	organizations:
		hel_council:
			name: "Helsingin kaupunginvaltuusto"
		kansanmuisti:
			name: "Kansan muisti"
		party1:
			name: "Puolue 1"
		party2:
			name: "Puolue 2"
	
	memberships:
		0: person_id: 'rep1', organization_id: 'party1'
		1: person_id: 'rep2', organization_id: 'party2'
	
	vote_events:
		guggis_valtuusto: organization_id: 'hel_council', motion_id: 'guggis_valtuusto'
		guggis_kamu: organization_id: 'kansanmuisti', motion_id: 'guggis_kamu'
	votes:
		0: vote_event_id: 'guggis_valtuusto', voter_id: 'rep1', vote_value: 1
		1: vote_event_id: 'guggis_valtuusto', voter_id: 'rep2', vote_value: -1
		2: vote_event_id: 'guggis_kamu', voter_id: 'user1', vote_value: -1
	
	vote_congruences:
		guggenheim:
			vote_event_source_id: 'guggis_valtuusto',
			vote_event_target_id: 'guggis_kamu'
			estimate: (src_vote) -> src_vote
###
#
data =
	persons:
		CURRENT_USER:
			name: "Current User"


	votes: {}

	organizations:
		hel_council:
			name: "Helsingin kaupunginvaltuusto"
		kansanmuisti:
			name: "Kansan muisti"
	
	motions:
		guggis_kamu: text: "Guggenheim", organization_id: "kansanmuisti"
		hameentie_kamu: text: "Autoton Hämeentie", organization_id: "kansanmuisti"
		keskustakirjasto_kamu: text: "Keskustakirjasto", organization_id: "kansanmuisti"
		lansimetro_kamu: text: "Länsimetron avoimuus", organization_id: "kansanmuisti"
		kasvisruokapaiva_kamu: text: "Kasvisruokapäivä", organization_id: "kansanmuisti"
	
	vote_events:
		guggis_kamu: organization_id: 'kansanmuisti', motion_id: 'guggis_kamu'
		hameentie_kamu: organization_id: 'kansanmuisti', motion_id: 'hameentie_kamu'
		keskustakirjasto_kamu: organization_id: 'kansanmuisti', motion_id: 'keskustakirjasto_kamu'
		lansimetro_kamu: organization_id: 'kansanmuisti', motion_id: 'lansimetro_kamu'
		kasvisruokapaiva_kamu: organization_id: 'kansanmuisti', motion_id: 'kasvisruokapaiva_kamu'
	
	
	vote_congruences:
		guggenheim:
			vote_event_source_id: '583801197c6d17175722ee22'
			vote_event_target_id: 'guggis_kamu'
			estimate: (src_vote) -> src_vote
		hameentie:
			vote_event_source_id: '5719dc5de90857870339f144'
			vote_event_target_id: 'hameentie_kamu'
			estimate: (src_vote) -> src_vote
		keskustakirjasto:
			vote_event_source_id: '55804a403e29c95059b92497'
			vote_event_target_id: 'keskustakirjasto_kamu'
			estimate: (src_vote) -> src_vote
		lansimetro:
			vote_event_source_id: '584a76192510f9a23d584023'
			vote_event_target_id: 'lansimetro_kamu'
			estimate: (src_vote) -> -src_vote
		kasvisruokapaiva:
			vote_event_source_id: '57440c5d9805a5a173b100d9'
			vote_event_target_id: 'kasvisruokapaiva_kamu'
			estimate: (src_vote) -> src_vote



popoloize_hel_council_votes = (data, votes) ->
	# TODO: Impute absents and empties
	for vote in votes
		motion_id = vote.register_id
		data.motions[motion_id] = vote
		vote_event_id = vote.vote_event.issue_id
		data.vote_events[vote_event_id] =
			organization_id: "hel_council"
			motion_id: motion_id
		for vote in vote.vote_event.votes
			voter_id = vote.name
			unless voter_id of data.persons
				data.persons[voter_id] =
					name: vote.name
					party: party_cleanup vote.party
			vote_id = "#{vote_event_id}/#{voter_id}"
			data.votes[vote_id] =
				vote_event_id: vote_event_id
				voter_id: voter_id
				party_id: party_cleanup vote.party
				vote: vote.vote
				vote_value: ("FOR": 1, "AGAINST": -1)[vote.vote] ? 0

	return data

getWhere = (obj, filter) ->
	R.filter R.whereEq(filter), obj

getOneWhere = (obj, filter) ->
	R.values(getWhere obj, filter)[0]


estimate_vote = (data, voter_id, vote_event_id) ->
	congruents = getWhere data.vote_congruences, vote_event_target_id: vote_event_id
	ests = []
	for _, congruent of congruents
		src_vote = getOneWhere data.votes,
			vote_event_id: congruent.vote_event_source_id
			voter_id: voter_id
		continue unless src_vote?
		ests.push congruent.estimate src_vote.vote_value
	est = R.mean ests
	ret =
		voter_id: voter_id
		vote_event_id: vote_event_id
		vote_value: est
	return ret

estimated_votes = (data) ->
	est = []
	for vote_event_id, _ of data.vote_events
		for voter_id, _ of data.persons
			est.push estimate_vote data, voter_id, vote_event_id
	return est

voter_agreements = (data, voter_id) ->
	ests = estimated_votes(data)
	my_votes = getWhere data.votes, voter_id: voter_id
	for person_id, person of data.persons
		paggs = []
		for _, my_vote of my_votes
			other_vote = getOneWhere ests,
				voter_id: person_id
				vote_event_id: my_vote.vote_event_id
			continue unless other_vote?
			my_value = my_vote.vote_value
			other_value = other_vote.vote_value
			continue unless other_value == other_value
			paggs.push my_value*other_value
		res =
			voter_id: person_id
			agreement: R.mean paggs
		yield res

party_typos =
	'Vasemmisto': 'Vas.'
	'Vihreät': 'Vihr.'
	'PerusSuomalaiset': 'PerusS'
	'Kokoomus': 'Kok.'
	'Keskusta': 'Kesk.'
party_cleanup = (party) ->
	party_typos[party] ? party

get_hack_data = ->
	popoloize_hel_council_votes data, require '../../importer/cases.json'

set_user_vote = (data, vote_event_id, vote_value) ->
	# Horrible! Shouldn't depend on the key format!
	vote_id = "#{vote_event_id}/CURRENT_USER"
	data.votes[vote_id] =
		voter_id: "CURRENT_USER"
		vote_event_id: vote_event_id
		vote_value: vote_value
	return data

get_user_agreements = (data) ->
	Array.from voter_agreements data, "CURRENT_USER"

get_user_party_agreements = (data) ->
	agreements = Array.from get_user_agreements data
	voter_party = (v) -> data.persons[v.voter_id].party
	party_agreements = R.groupBy voter_party, (R.sortBy voter_party, agreements)
	
	party_agreements = for party, agrs of party_agreements
		v = R.map (R.prop 'agreement'), agrs
		v = R.filter ((v) -> v == v), v
		
		party: party
		agreement: R.mean v
	
	[good, bad] = R.partition ((v) -> v.agreement == v.agreement), party_agreements
	R.concat (R.sortBy ((v) -> -v.agreement), good), bad

module.exports = `{get_hack_data, set_user_vote, get_user_agreements, get_user_party_agreements}`

if require.main == module
	#data = popoloize_hel_council_votes(data, require './cases.json')
	data = get_hack_data()
	data = set_user_vote(data, 'guggis_kamu', -1.0)
	data = set_user_vote(data, 'hameentie_kamu', 1.0)
	data = set_user_vote(data, 'keskustakirjasto_kamu', 1.0)
	data = set_user_vote(data, 'lansimetro_kamu', 1.0)
	data = set_user_vote(data, 'kasvisruokapaiva_kamu', 1.0)
	console.log get_user_party_agreements data
