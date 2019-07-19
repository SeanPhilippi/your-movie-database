import { TYPES } from './actions';
import { arrayMove } from 'react-sortable-hoc';
import isEmpty from '../is-empty';

const initialState = {
  isAuthenticated: false,
  user_token: {},
  user: {},
  authErrors: {},
  searchResults: [],
  listDescript: '',
  list: [],
  open: false,
  whatToShow: 'home',
  newUsers: []
}

// destructured action parameter is desctructured and passed in to rootReducer function,
// then state slices to return if type === <case>
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TYPES.SET_CURRENT_USER: return {
      ...state,
      user: payload.user
    }
    case TYPES.SET_NEW_USERS: return {
      ...state,
      newUsers: payload.users
    }
    case TYPES.GET_ERRORS: return {
      ...state,
      authErrors: payload
    }
    case TYPES.SET_TOKEN: return {
      ...state,
      // if token exists, true, else false
      isAuthenticated: !isEmpty(payload),
      // token
      user_token: payload
    };
    case TYPES.SET_UPDATE_STATUS: return {
      ...state,
      open: !state.open
    };
    case TYPES.SET_DESCRIPT: return {
      ...state,
      listDescript: payload.text
    };
    case TYPES.SET_SEARCH_TEXT: return {
      ...state,
      searchText: payload.text,
    };
    case TYPES.CLEAR_SEARCH_TEXT: return {
      ...state,
      searchText: []
    };
    case TYPES.SET_SEARCH_RESULTS: return {
      ...state,
      searchResults: [...state.searchResults, ...payload.data],
    };
    // set fetched movie list to state
    case TYPES.SET_LIST: return {
      ...state,
      listDescript: payload.listDescript,
      list: [...payload.list]
    };
    case TYPES.ADD_TO_LIST: return {
      ...state,
      list: [payload.movie, ...state.list]
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
    case TYPES.DELETE_LIST: return {
      ...state,
      list: []
    };
    default: return state;
  }
}