import { TYPES } from './actions';

const initialState = {
  apiUrl: 'http://www.omdbapi.com/?',
  apiKey: 'd5d74a24&',
  searchText: '',
  searchResults: [],
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_SEARCH_TEXT: return {
      ...state,
      searchText: payload.text,
    };
    case TYPES.SET_SEARCH_RESULTS: return {
      ...state,
      searchResults: payload.data,
    };
    default: return state;
  }
}