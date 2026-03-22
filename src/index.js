import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import setJwtToken from './utils/auth/setJwtToken';

import './styles/styles.scss';
import './index.css';
import './utils/fontAwesome';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Michroma'],
  },
});

// when app starts, check localStorage if jwtToken is set, if so, setToken
// then check jwtToken expiration date, if expired, then logout user, redirect to '/'
setJwtToken();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
