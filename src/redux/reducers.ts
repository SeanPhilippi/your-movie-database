import arrayMove from 'array-move';
import { TYPES } from './actions';
import isEmpty from '../utils/helpers/is-empty';
import { AnyAction } from 'redux';

interface UserToken {
  id: string;
  username: string;
  email: string;
  iat: number;
  exp: number;
}

interface MovieItem {
  id: string;
  title: string;
  year: string;
  director: string;
}

interface Movie extends MovieItem {
  averageRanking: number;
  points: number;
  numberOfLists: number;
  overallRanking: number;
}

interface User {
  username?: string;
  email?: string;
  id?: string;
  statement?: string;
  items?: Movie[];
}

interface MovieInfo {
  title: string;
  year: string;
  poster: string;
  director: string;
  release_date: string;
  country: string;
  imdbId: string;
  runtime: string;
  plot: string;
}

interface AuthErrors {
  username?: string;
  login?: string;
  email?: string;
  password?: string;
  password2?: string;
}

interface Comment {
  movie_id?: string;
  top_movies_list?: boolean;
  author: string;
  username: string;
  text: string;
  post_date: string;
  disabled?: boolean;
}

interface List {
  username: string;
  statement?: string;
  items?: MovieItem[];
}

interface Affinity {
  username: string;
  score: string;
}

interface Voter {
  id: string;
  username: string;
  rank: number;
}

interface MovieStats {
  voters: Voter[];
  averageRanking: number;
  points: number;
  overallRanking: number;
}

export interface ReduxState {
  isAuthenticated: boolean;
  user_token: UserToken | {};
  user: User | {};
  authErrors: AuthErrors | {};
  username: string;
  statement: string;
  items: MovieItem[];
  currentPage: number;
  pages: number[];
  moviesPerPage: number;
  currentTopMovies: Movie[];
  topMoviesList: Movie[];
  open: boolean;
  message: string;
  newUsers: User[];
  comments: Comment[];
  affinities: Affinity[];
  movie: MovieInfo | {};
  movieStats: MovieStats | {};
  isEditing: boolean;
  listDataLoading: boolean;
  commentsLoading: boolean;
  affinitiesLoading: boolean;
  movieDetailsLoading: boolean;
  movieStatsLoading: boolean;
}

const initialState: ReduxState = {
  isAuthenticated: false,
  user_token: {},
  user: {
    email: '',
    id: '',
    username: '',
    statement: '',
    items: [],
  }, // object containing email, id, username, statement, items of authenticated user
  authErrors: {},
  username: '',
  statement: '',
  items: [],
  currentPage: 1,
  pages: [1, 2, 3, 4, 5],
  moviesPerPage: 25,
  currentTopMovies: [],
  topMoviesList: [],
  open: false,
  message: '',
  newUsers: [],
  comments: [],
  affinities: [],
  movie: {},
  movieStats: {}, // voters, averageRanking, points, overallRanking
  isEditing: false,
  listDataLoading: true,
  commentsLoading: true,
  affinitiesLoading: true,
  movieDetailsLoading: true,
  movieStatsLoading: true,
};

export default (state = initialState, { type, payload }: AnyAction) => {
  // console.log('reducer', type, payload);
  switch (type) {
    case TYPES.SET_CURRENT_USER:
      return {
        ...state,
        user: payload,
      };
    case TYPES.SET_NEW_USERS:
      return {
        ...state,
        newUsers: payload.users.reverse(),
      };
    case TYPES.GET_ERRORS:
      return {
        ...state,
        authErrors: payload,
      };
    case TYPES.CLEAR_ERRORS:
      return {
        ...state,
        authErrors: {},
      };
    case TYPES.SET_TOKEN:
      return {
        ...state,
        // if token exists, true, else false
        isAuthenticated: !isEmpty(payload),
        // token
        user_token: payload,
      };
    case TYPES.SET_MESSAGE_STATUS:
      return {
        ...state,
        open: !state.open,
        message: payload,
      };
    case TYPES.SET_EDITING:
      return {
        ...state,
        isEditing: payload,
      };
    case TYPES.SET_STATEMENT:
      return {
        ...state,
        user: {
          ...state.user,
          statement: payload,
        },
      };
    case TYPES.SET_AUTH_LIST_DATA:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
        username: payload.username,
      };
    case TYPES.SET_LIST_DATA:
      return {
        ...state,
        username: payload.username,
        statement: payload.statement,
        items: payload.items,
      };
    case TYPES.SET_AFFINITIES:
      return {
        ...state,
        affinities: payload,
      };
    case TYPES.SET_COMMENTS:
      return {
        ...state,
        comments: payload,
      };
    case TYPES.SET_MOVIE:
      return {
        ...state,
        movie: payload,
      };
    case TYPES.SET_MOVIE_STATS:
      return {
        ...state,
        movieStats: payload,
      };
    case TYPES.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment._id !== payload),
      };
    case TYPES.SET_LIST_DATA_LOADING:
      return {
        ...state,
        listDataLoading: payload,
      };
    case TYPES.SET_COMMENTS_LOADING:
      return {
        ...state,
        commentsLoading: payload,
      };
    case TYPES.SET_MOVIE_DETAILS_LOADING:
      return {
        ...state,
        movieDetailsLoading: payload,
      };
    case TYPES.SET_MOVIE_STATS_LOADING:
      return {
        ...state,
        movieStatsLoading: payload,
      };
    case TYPES.SET_AFFINITIES_LOADING:
      return {
        ...state,
        affinitiesLoading: payload,
      };
    case TYPES.ADD_TO_LIST:
      return {
        ...state,
        user: {
          ...state.user,
          items: [payload, ...state.user.items],
        },
      };
    case TYPES.REORDER_LIST:
      return {
        ...state,
        user: {
          ...state.user,
          items: arrayMove(
            state.user.items,
            payload.oldIndex,
            payload.newIndex
          ),
        },
      };
    case TYPES.DELETE_MOVIE:
      return {
        ...state,
        user: {
          ...state.user,
          items: [
            ...state.user.items.filter(movie => movie.id !== payload.movie.id),
          ],
        },
      };
    case TYPES.DELETE_LIST:
      return {
        ...state,
        user: {
          ...state.user,
          items: [],
        },
      };
    case TYPES.SET_TOP_MOVIES_LIST:
      return {
        ...state,
        topMoviesList: payload,
      };
    case TYPES.SET_CURRENT_TOP_MOVIES:
      return {
        ...state,
        currentTopMovies: payload,
      };
    case TYPES.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case TYPES.SET_NUM_OF_PAGES:
      return {
        ...state,
        pages: payload,
      };
    case TYPES.SET_MOVIES_PER_PAGE:
      return {
        ...state,
        moviesPerPage: payload,
      };
    default:
      return state;
  }
};
