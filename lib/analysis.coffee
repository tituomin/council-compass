R = require 'ramda'

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

getWhere = (obj, filter) ->
	R.filter R.whereEq(filter), obj

estimate_vote = (voter_id, vote_event_id) ->
	congruents = getWhere data.vote_congruences, vote_event_target_id: vote_event_id
	ests = []
	for _, congruent of congruents
		src_vote = getWhere data.votes,
			vote_event_id: congruent.vote_event_source_id
			voter_id: voter_id
		src_vote = R.values(src_vote)[0]
		continue unless src_vote?
		ests.push congruent.estimate src_vote.vote_value
	est = R.mean ests
	ret =
		voter_id: voter_id
		vote_event_id: vote_event_id
		vote_value: est
	return ret

estimated_votes = ->
	est = []
	for vote_event_id, _ of data.vote_events
		for voter_id, _ of data.persons
			est.push estimate_vote voter_id, vote_event_id
	return est

my_agreements = (me) ->
	ests = estimated_votes()
	my_votes = getWhere data.votes, voter_id: me
	for person_id, person of data.persons
		paggs = []
		for _, my_vote of my_votes
			other_vote = R.values getWhere ests,
				voter_id: person_id
				vote_event_id: my_vote.vote_event_id
			other_vote = other_vote[0]
			continue unless other_vote?
			my_value = my_vote.vote_value
			other_value = other_vote.vote_value
			continue unless other_value == other_value
			paggs.push my_value*other_value
		res =
			voter_id: person_id
			agreement: R.mean paggs
		yield res
	#console.log my_votes
if require.main == module
	console.log Array.from my_agreements('user1')
