export const HANDLE_SEARCH = 'HANDLE_SEARCH'
export const CREATE_RESULTS = 'CREATE_RESULTS';
export const HANDLE_ADD = 'HANDLE_ADD';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT';

export function handleSearch() {
  return {
    type: HANDLE_SEARCH,
    value: ""
  }
}

// action creator, creates action object to return
export function createResults(movies) {
  return { type: CREATE_RESULTS, movies }
}
// split handleAdd into 2 actions since state.results is changed AND 
// state.list is changed
export function handleAdd() {
  return { type: HANDLE_ADD, list }
}
export function clearResults() {
  return { type: CLEAR_RESULTS, results }
}

export function setSearchText(text) {
  return { type: SET_SEARCH_TEXT, text }
}

// export function onKeyUp() {
//   return {
//     type: "ON_KEY_UP",
//     value: ""
//   }
// }