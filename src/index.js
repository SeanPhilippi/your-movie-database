import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import history from './utils/history';
import dotenv from 'dotenv';
import App from './App';
import store from './redux/store';
import setJwtToken from './utils/auth/setJwtToken';
import './styles/styles.scss';
import './index.css';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Michroma']
  }
});

dotenv.config();

// when app starts, check localStorage if jwtToken is set, if so, setToken
// then check jwtToken expiration date, if expired, then logout user, redirect to '/'
setJwtToken();

ReactDOM.render(
  <Router history={ history }>
    <Provider store={ store }>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);
