import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import AppNavigation from './components/mock/AppNavigation';
import MotionDetails from './components/mock/MotionDetails';
import MotionList from './components/mock/MotionList';
import PartyList from './components/mock/PartyList';
import PartyMap from './parties';
import _ from 'lodash';

const cases = require('../importer/cases.json');

class App extends Component {
  componentWillMount() {
    let partyMap = new PartyMap();
    partyMap.fetch().then((response) => {
      this.partyMap = partyMap;
      this.setState((prevState, props) => {
        return Object.assign({}, prevState, {initialised: true});
      });
    });
  }

  constructor() {
    super();
    this.partyMap = null;
    this.cases = cases;
    this.state = {
      initialised: false,
      userVotes: {},
      nextCase: undefined,
      remainingVotes: this.cases.length
    };
  }

  castVote(issueId, value) {
    this.setState(
      (prevState) => {
        const userVotes = Object.assign(prevState.userVotes, {[issueId]: value});
        const nextCases = _.filter(this.cases, (_case) => {
          return userVotes[_case.issue_id] === undefined;
        });
        const nextCaseObject = nextCases[0];
        this.redirectHandled = false;
        const nextCase = nextCaseObject ? nextCaseObject.issue_id : undefined;
        const result = Object.assign(
          {}, prevState,
          {userVotes, nextCase, remainingVotes: nextCases.length});
        return result;
      }
    );
  }

  render() {
    if (!this.state.initialised) {
      return <div>LOADING...</div>;
    }
    if (this.state.nextCase && !this.redirectHandled) {
      this.redirectHandled = true;
      return <Redirect to={`/motion/${this.state.nextCase}`}/>;
    }
    if (this.state.remainingVotes === 0) {
      return <Redirect to={"/party"}/>;
    }
    return (
      <div className="App">
        <AppNavigation />
        <div className="App-content bg-washed-green mw7 center cf ph3 pt5">
          <Switch>
              <Route path="/party" component={PartyList} />
              <Route path="/motion/:id" component={({match}) => {
                    const issueId = match.params.id;
                    const _case = _.find(this.cases, (c) => {return c.issue_id === issueId;});
                    return <MotionDetails _case={_case} castVote={_.bind(this.castVote, this)}/>;
                    }
                  } />
              <Route path="/motion" component={
                       () => {
                         return <MotionList cases={this.cases} userVotes={this.state.userVotes} />;
                       }
                  } />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
