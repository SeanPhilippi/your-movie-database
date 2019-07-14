import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// for connecting App to Redux store
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from "./redux/actions";
import setAuthToken from './setAuthToken';
require('dotenv').config();

import './index.css';

// Redux store to be used in Provider component
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // hooks up app to Redux Tools chrome extension only if available
    (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) || compose
  )
);

// ** initialState is stored in reducers.js **

// when app starts, check localStorage if jwtToken is set, if so, setCurrentUser
// then check jwtToken expiration date, if expired, then logout user, redirect to /login
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // check if token is expired
  // if so, redirect to login
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
