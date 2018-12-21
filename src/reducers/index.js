import { combineReducers } from 'redux';

function handleSearch() {
  if (action.type === "HANDLE_SEARCH") {
    return
  }
  return state;
}

function createResults() {
  if (action.type === "CREATE_RESULTS") {
    return
  }
  return state;
}

function handleAdd() {
  if (action.type === "HANDLE_ADD") {
    return
  }
  return state;
}

function onTextChange() {
  if (action.type === "SET_SEARCH_TEXT") {
    return
  }
  return state;
}

function onKeyUp() {
  if (action.type === "ON_KEY_UP") {
    return
  }
  return state;
}

export default combineReducers({
  handleSearch, createResults, handleAdd, onTextChange, onKeyUp
})