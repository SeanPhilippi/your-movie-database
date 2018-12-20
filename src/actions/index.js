export function handleSearch() {
  return {
    type: "HANDLE_SEARCH",
    value: ""
  }
}

export function createResults(movies) {
  return {
    type: "CREATE_RESULTS",
    value: movies
  }
}

export function handleAdd() {
  return {
    type: "HANDLE_ADD",
    value: ""
  }
}

export function onTextChange() {
  return {
    type: "ON_TEXT_CHANGE",
    value: ""
  }
}

export function onKeyUp() {
  return {
    type: "ON_KEY_UP",
    value: ""
  }
}