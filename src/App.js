import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppNavigation from './components/mock/AppNavigation';
import MotionDetails from './components/mock/MotionDetails';
import MotionList from './components/mock/MotionList';
import PartyList from './components/mock/PartyList';
import PartyMap from './parties';

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
      initialised: false
    };
  }

  render() {
    if (!this.state.initialised) {
      return <div>LOADING...</div>;
    }
    return (
      <div className="App">
        <AppNavigation />
        <div className="App-content bg-washed-green mw7 center cf ph3 pt5">
          <Switch>
              <Route path="/motion/:id" component={MotionDetails} />
              <Route path="/motion" component={() => {return <MotionList cases={this.cases} />;}} />
              <Route path="/party" component={PartyList} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
