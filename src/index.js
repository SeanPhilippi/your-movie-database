import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// for connecting App to Redux store
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
require('dotenv').config()

// Redux store to be used in Provider component
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // hooks up app to Redux Tools chrome extention
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// ** initialsState is stored in reducers.js **

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
