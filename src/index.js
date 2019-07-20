import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import dotenv from 'dotenv';
import App from './App';
import store from './redux/store';
import setJwtToken from './utils/auth/setJwtToken';
import './index.css';

dotenv.config();

// when app starts, check localStorage if jwtToken is set, if so, setToken
// then check jwtToken expiration date, if expired, then logout user, redirect to '/'
setJwtToken();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
