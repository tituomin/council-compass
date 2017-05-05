import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { castUserVote } from './actions';

import { HashRouter as Router } from 'react-router-dom';

import rootReducer from './reducers';

const store = createStore(rootReducer);

window.castUserVote = castUserVote;
window.store = store;

ReactDOM.render(
  <Provider store={store}>
      <Router>
          <App/>
      </Router>
  </Provider>,
  document.getElementById('root'));

