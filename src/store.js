import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-react';

const initialState = {};

const middleware = [thunk];

const store = createStore(rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;