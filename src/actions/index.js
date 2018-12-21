// export function handleSearch() {
//   return {
//     type: "HANDLE_SEARCH",
//     value: ""
//   }
// }

export function createResults(movies) {
  return {
    type: "CREATE_RESULTS",
    value: movies
  }
}
// split handleAdd into 2 actions since state.results is changed AND 
// state.list is changed
export function handleAdd() {
  return {
    type: "HANDLE_ADD",
    value: list
  }
}
export function clearResults() {
  return {
    type: "CLEAR_RESULTS",
    value: results
  }
}

export function setSearchText(text) {
  return {
    type: "SET_SEARCH_TEXT",
    value: text
  }
}

// export function onKeyUp() {
//   return {
//     type: "ON_KEY_UP",
//     value: ""
//   }
// }