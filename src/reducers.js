import { combineReducers } from 'redux';
import _ from 'lodash';

const initialUserVotes = {
    votes: [
    ]
}

function userVoteReducer(state = initialUserVotes, action) {
    switch (action.type) {
    case 'CAST_USER_VOTE':
      const vote = action.payload;
      const result = Object.assign(
        {}, state,
        { votes: state.votes.concat(vote) });
      return result;
    case 'CLEAR_USER_VOTES':
      return Object.assign(
        {}, state, {votes: []});
    }
  return state;
}

export default combineReducers({
   userVotes: userVoteReducer 
});
