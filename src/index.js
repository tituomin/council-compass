import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { Router, Route, browserHistory, IndexRedirect }  from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}/>
  <App />,
  document.getElementById('root')
);
