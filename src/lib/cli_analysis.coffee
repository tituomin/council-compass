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
		console.log anal.get_user_party_vote_agreements data, vote_event_id
	console.log "TOTAL"
	console.log anal.get_user_party_agreements data
