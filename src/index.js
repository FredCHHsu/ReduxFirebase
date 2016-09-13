// if (module.hot) {
//   module.hot.accept();
//   module.hot.decline('./routes.js');
// }

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import routes from './routes';
import reducers from './reducers';

const store = createStore(
  reducers,
  applyMiddleware(promise, thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.querySelector('#app-entry-point')
);
