import arrayMove from 'array-move';
import { TYPES } from './actions';
import isEmpty from '../utils/helpers/is-empty';

const initialState = {
  isAuthenticated: false,
  user_token: {},
  user: {}, // object containing email, id, username of authenticated user
  authErrors: {},
  username: '',
  statement: '',
  items: [],
  currentPage: 1,
  moviesPerPage: 25,
  currentTopMovies: [],
  topMoviesList: [],
  open: false,
  newUsers: [],
  comments: [],
  affinities: [],
  movie: {},
  movieStats: {}, // voters, averageRanking, points, overallRanking
  isEditing: false,
  listDataLoading: true,
  commentsLoading: true,
  affinitiesLoading: true,
  movieStatsLoading: true
};

export default (state = initialState, { type, payload }) => {
  // console.log('reducer', type, payload);
  switch (type) {
    case TYPES.SET_CURRENT_USER: return {
      ...state,
      user: payload
    };
    case TYPES.SET_NEW_USERS: return {
      ...state,
      newUsers: payload.users.reverse()
    };
    case TYPES.GET_ERRORS: return {
      ...state,
      authErrors: payload
    };
    case TYPES.CLEAR_ERRORS: return {
      ...state,
      authErrors: {}
    };
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
    case TYPES.SET_EDITING: return {
      ...state,
      isEditing: payload
    };
    case TYPES.SET_STATEMENT: return {
      ...state,
      statement: payload.text
    };
    case TYPES.SET_LIST_DATA: return {
      ...state,
      username: payload.username,
      statement: payload.statement,
      items: payload.items
    };
    case TYPES.SET_AFFINITIES: return {
      ...state,
      affinities: payload
    };
    case TYPES.SET_COMMENTS: return {
      ...state,
      comments: payload
    };
    case TYPES.SET_MOVIE: return {
      ...state,
      movie: payload
    };
    case TYPES.SET_MOVIE_STATS: return {
      ...state,
      movieStats: payload
    };
    case TYPES.POST_COMMENT: return {
      ...state,
      comments: [payload, ...state.comments]
    };
    case TYPES.SET_LIST_DATA_LOADING: return {
      ...state,
      listDataLoading: payload
    };
    case TYPES.SET_COMMENTS_LOADING: return {
      ...state,
      commentsLoading: payload
    };
    case TYPES.SET_MOVIE_STATS_LOADING: return {
      ...state,
      movieStatsLoading: payload
    };
    case TYPES.SET_AFFINITIES_LOADING: return {
      ...state,
      affinitiesLoading: payload
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
    case TYPES.SET_TOP_MOVIES_LIST: return {
      ...state,
      topMoviesList: payload
    };
    case TYPES.SET_CURRENT_TOP_MOVIES: return {
      ...state,
      currentTopMovies: payload
    };
    case TYPES.SET_CURRENT_PAGE: return {
      ...state,
      currentPage: payload
    };
    default: return state;
  }
};