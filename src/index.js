import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { castUserVote } from './actions';

import { HashRouter as Router } from 'react-router-dom';

window.castUserVote = castUserVote;

ReactDOM.render(
  <Router>
      <App/>
  </Router>,
  document.getElementById('root'));

