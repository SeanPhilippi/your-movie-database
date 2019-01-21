import { TYPES } from './actions';
import { arrayMove } from 'react-sortable-hoc';

const initialState = {
  apiUrl: 'http://www.omdbapi.com/?',
  apiKey: 'd5d74a24&',
  searchText: '',
  searchResults: [],
  listID: null,
  listName: null,
  list: [
    // dummy data
    { name: '2001: A Space Odyssey', year: '1968', director: 'Stanley Kubrick', id: 'tt0062622' },
    { name: 'Mulholland Dr.', year: '2001', director: 'David Lynch', id: 'tt0166924' },
    { name: 'Pickpocket', year: '1955', director: 'Robert Bresson', id: 'tt0053168' },
    { name: 'Persona', year: '1966', director: 'Ingmar Bergman', id: 'tt0060827' },
    { name: 'Solaris', year: '1972', director: 'Andrei Tarkovsky', id: 'tt0069293' },
    { name: '2046', year: '2004', director: 'Wong Kar-Wai', id: 'tt0212712' },
    { name: 'Three Colors: Blue', year: '1993', director: 'Krzysztof Kieslowski', id: 'tt0108394' }
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
    case TYPES.REORDER_LIST: return {
      ...state,
      list: arrayMove(state.list, payload.oldIndex, payload.newIndex)
    };
    case TYPES.DELETE_MOVIE: return {
      ...state,
      list: [...state.list.filter(movie => movie.id !== payload.movie.id)]
    };
    default: return state;
  }
}