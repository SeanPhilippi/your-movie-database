import { TYPES } from './actions';
import { arrayMove } from 'react-sortable-hoc';
import isEmpty from '../utils/helpers/is-empty';

const initialState = {
  isAuthenticated: false,
  user_token: {},
  user: {}, // object containing email, id, username
  authErrors: {},
  statement: '',
  items: [],
  open: false,
  newUsers: [],
  visitedItems: [
    {
      title: 'The Thin Red Line',
      director: 'Terrence Malick',
      year: '1998'
    },
    {
      title: 'Fascination',
      director: 'Jean Rollin',
      year: '1979'
    },
  ]
}

// destructured action parameter is desctructured and passed in to rootReducer function,
// then state slices to return if type === <case>
export default (state = initialState, { type, payload }) => {
  console.log('reducer', type, payload);
  switch (type) {
    case TYPES.SET_CURRENT_USER: return {
      ...state,
      user: payload
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
    case TYPES.SET_STATEMENT: return {
      ...state,
      statement: payload.text
    };
    case TYPES.SET_LIST: return {
      ...state,
      user: { ...state.user, username: payload.listData.username },
      statement: payload.listData.statement,
      items: [...payload.listData.items]
    };
    case TYPES.ADD_TO_LIST: return {
      ...state,
      items: [payload.movie, ...state.items]
    };
    case TYPES.REORDER_LIST: return {
      ...state,
      items: arrayMove(state.items, payload.oldIndex, payload.newIndex)
    };
    case TYPES.DELETE_MOVIE: return {
      ...state,
      items: [...state.items.filter(movie => movie.id !== payload.movie.id)]
    };
    case TYPES.DELETE_LIST: return {
      ...state,
      items: []
    };
    default: return state;
  }
}
