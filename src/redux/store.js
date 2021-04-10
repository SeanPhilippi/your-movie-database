import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import * as actionCreators from './actions';

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: process.env.NODE_ENV !== 'production',
  // traceLimit: 25,
});

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));