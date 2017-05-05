import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Helmet } from "react-helmet";
import AppNavigation from './components/mock/AppNavigation';
import MotionDetails from './components/mock/MotionDetails';
import MotionList from './components/mock/MotionList';
import PartyList from './components/mock/PartyList';
import FrontPage from './components/mock/FrontPage';
import PartyMap from './parties';
import analyzer from './lib/analysis';
import _ from 'lodash';
import { populatePartyLogos } from './utils';

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

  getNextCase(userVotes) {
    const nextCases = _.filter(this.cases, (_case) => {
      return userVotes[_case.issue_id] === undefined;
    });
    const nextCaseObject = nextCases[0];
    return {nextCase: (nextCaseObject ? nextCaseObject.issue_id : undefined), remainingVotes: nextCases.length};
  }

  constructor() {
    super();
    this.voteData = analyzer.get_hack_data();
    this.partyMap = null;
    this.cases = cases;
    this.redirectHandled = true;
    this.state = {
      initialised: false,
      userVotes: {},
      nextCase: this.getNextCase({}).nextCase,
      remainingVotes: this.cases.length,
      partyAgreements: {},
      votesUpdated: null
    };
  }

  castVote(issueId, value) {
    let analyzerVoteId = issueId + '/kamu';
    analyzer.set_user_vote(this.voteData, analyzerVoteId, value);
    let partyAgreements = analyzer.get_user_party_vote_agreements(this.voteData, analyzerVoteId);
    populatePartyLogos(partyAgreements, this.partyMap);
    partyAgreements = _.filter(
      partyAgreements,
      (a) => { return a.party !== "undefined" && a.partyLogo; });

    this.setState(
      (prevState) => {
        partyAgreements = Object.assign({}, prevState.partyAgreements, {[issueId]: partyAgreements});
        const userVotes = Object.assign(prevState.userVotes, {[issueId]: value});
        this.redirectHandled = false;
        const {nextCase, remainingVotes} = this.getNextCase(userVotes);
        const result = Object.assign(
          {}, prevState,
          {userVotes, nextCase, remainingVotes, partyAgreements, votesUpdated: Date.now()});
        return result;
      }
    );
  }

  emptyVotes() {
    this.setState(
      (prevState) => {
        return Object.assign({}, prevState, {userVotes: {}});
      }
    );
  }

  render() {
    if (!this.state.initialised) {
      return <div>LOADING...</div>;
    }
    if (this.state.remainingVotes === 0 && !this.redirectHandled) {
      this.redirectHandled = true;
      return <Redirect to="/party"/>;
    }
    return (
      <div className="App sans-serif">
        <Helmet>
            <meta charSet="utf-8" />
            <title>Partisipaattori</title>
        </Helmet>
        <AppNavigation />
        <div className="App-content bg-washed-green mw7 center cf ph3 pt5">
          <Switch>
              <Route path="/party" component={() => {
                  return <PartyList partyMap={this.partyMap} voteData={this.voteData} votesUpdated={this.state.votesUpdated}/>;}
                  } />
              <Route path="/motion/:id" component={({match}) => {
                    const issueId = match.params.id;
                    const _case = _.find(this.cases, (c) => {return c.issue_id === issueId;});
                    return <MotionDetails
                                  _case={_case}
                                  castVote={_.bind(this.castVote, this)}
                                  nextCase={this.state.nextCase}
                                  partyAgreements={this.state.partyAgreements[issueId]}
                                  userVote={this.state.userVotes[issueId]}/>;
                    }
                  } />
              <Route path="/motion" component={
                       () => {
                         return <MotionList cases={this.cases} userVotes={this.state.userVotes} emptyVotes={_.bind(this.emptyVotes, this)} />;
                       }
                  } />
              <Route path="/" component={
                       () => {
                         return <FrontPage nextVote={this.state.nextCase}/>;
                       }
                     }/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
