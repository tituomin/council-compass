import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { HashRouter as Router } from 'react-router-dom';

import rootReducer from './reducers/index';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
      <Router>
          <App/>
      </Router>
  </Provider>,
  document.getElementById('root'));

