import { combineReducers } from 'redux';

function handleSearch(state = , action) {
  if (action.type === HANDLE_SEARCH) {
    return action.value;
  }
  return state;
}

function createResults(state = , action) {
  if (action.type === CREATE_RESULTS) {
    // return action.value;
  }
  return state;
}

function handleAdd(state = , action) {
  if (action.type === HANDLE_ADD) {
    // return action.value;
  }
  return state;
}

function onTextChange(state = , action) {
  if (action.type === SET_SEARCH_TEXT) {
    // return action.value;
  }
  return state;
}

// function onKeyUp(state = , action) {
//   if (action.type === ON_KEY_UP) {
//     return action.value;
//   }
//   return state;
// }

export default combineReducers({
  handleAdd, createResults, handleAdd, onTextChange
})