import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MotionDetails from './components/mock/MotionDetails';
import MotionList from './components/mock/MotionList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Valtuustokone</h2>
        </div>
        <Switch>
            <Route path="/motion/:id" component={MotionDetails} />
            <Route path="/motion" component={MotionList} />
        </Switch>
      </div>
    );
  }
}

export default App;
