anal = require './analysis.coffee'
inquirer = require 'inquirer'
R = require 'ramda'

do ->
	data = anal.get_hack_data()

	kamu_events = anal.getWhere data.vote_events, organization_id: 'kansanmuisti'
	choices = ['Ei', 'Evvk', 'Kyllä']
	total_votes = []
	for vote_event_id, vote_event of kamu_events
		motion = data.motions[vote_event.motion_id]
		answer = await inquirer.prompt
			type: 'list'
			name: 'dontfuckingcare'
			message: motion.text
			choices: choices
		value = choices.indexOf(answer.dontfuckingcare) - 1
		data = anal.set_user_vote data, vote_event_id, value
		#console.log anal.get_user_party_vote_agreements data, vote_event_id
	
	person_agrs = anal.get_user_agreements data
	for person_agr in person_agrs
		person_agr.party = data.persons[person_agr.voter_id].party
	party_agrs = anal.get_user_party_agreements data
	for party_agr in party_agrs
		console.log Math.round((party_agr.agreement + 1)/2*100) + "\t" + party_agr.party
		pp = anal.getWhere person_agrs, party: party_agr.party
		for person_agr in pp
			console.log '\t' + Math.round((person_agr.agreement + 1)/2*100), person_agr.voter_id
