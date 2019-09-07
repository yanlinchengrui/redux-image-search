import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import promise from 'redux-promise-middleware';

import { reducer } from './reduxStore';

import './index.css';
import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, applyMiddleware(promise, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
