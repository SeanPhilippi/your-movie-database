import { TYPES } from './actions';

const initialState = {
  apiUrl: 'http://www.omdbapi.com/?',
  apiKey: 'd5d74a24&',
  searchText: '',
  searchResults: [],
  list: [
    { name: '2001: A Space Odyssey', year: '1968', director: 'Stanley Kubrick', subtitle: true },
    { name: 'Mulholland Drive', year: '2001', director: 'David Lynch', subtitle: true },
    { name: 'Pickpocket', year: '1955', director: 'Robert Bresson', subtitle: true },
    { name: 'Persona', year: '1966', director: 'Ingmar Bergman', subtitle: true },
    { name: 'Solaris', year: '1972', director: 'Andrei Tarkovsky', subtitle: true },
    { name: '2046', year: '2004', director: 'Wong Kar-Wai', subtitle: true },
    { name: 'Three Colors: Blue', year: '1993', director: 'Krzysztof Kieslowski', subtitle: true }
  ]
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
    case TYPES.SET_MOVIE_LIST: return {
      ...state,
      list: [...state.list, payload.movie]
    };
    case TYPES.CLEAR_SEARCH_RESULTS: return {
      ...state,
      searchResults: []
    };
    default: return state;
  }
}