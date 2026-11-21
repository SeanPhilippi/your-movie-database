import arrayMove from 'array-move';
import { TYPES } from './actions';
import isEmpty from '../utils/helpers/is-empty';

const initialState = {
  isAuthenticated: false,
  user_token: {},
  user: {
    email: '',
    id: '',
    username: '',
    statement: '',
    items: [],
  },
  listOrdering: {
    oldIndex: null,
    newIndex: null,
  },
  deletedMovies: [],
  addedMovies: [],
  authErrors: {
    email: null,
    username: null,
    password: null,
    password2: null,
    general: null,
  },
  username: '',
  statement: '',
  items: [],
  currentPage: 1,
  pages: [1, 2, 3, 4, 5],
  moviesPerPage: 30,
  currentTopMovies: [],
  topMoviesList: [],
  open: false,
  message: '',
  newUsers: [],
  mostVisited: [],
  mostVisitedLoading: true,
  comments: [],
  affinities: [],
  movie: {},
  movieStats: {}, // voters, averageRanking, points, overallRanking
  resetPasswordSuccess: '',
  isEditing: false,
  listDataLoading: true,
  commentsLoading: true,
  affinitiesLoading: true,
  movieDetailsLoading: true,
  movieStatsLoading: true,
  topMoviesLoading: true,
  newUsersLoading: true,
  notifications: [],
  notificationsLoading: true,
  userPreferences: {
    emailPreferences: {
      profileComments: true,
      mentions: true,
      announcements: true,
    },
    inAppPreferences: {
      profileComments: true,
      mentions: true,
      announcements: false,
    },
    hideVisitCount: false,
    hideFromMostVisited: false,
  },
};

export default (state = initialState, { type, payload }) => {
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
    case TYPES.SET_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordSuccess: payload,
      };
    case TYPES.SET_TOKEN:
      return {
        ...state,
        // if token exists, true, else false
        isAuthenticated: !isEmpty(payload),
        // token
        user_token: payload,
        // immediately populate basic user fields from the decoded JWT so
        // state.user.username is never empty while isAuthenticated is true
        // (fetchCurrentUser is async and may not have resolved yet)
        ...(isEmpty(payload) ? {} : {
          user: {
            ...state.user,
            id: payload.id,
            username: payload.username,
            email: payload.email,
          },
        }),
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
    case TYPES.SET_TOP_MOVIES_LOADING:
      return {
        ...state,
        topMoviesLoading: payload,
      };
    case TYPES.SET_NEW_USERS_LOADING:
      return {
        ...state,
        newUsersLoading: payload,
      };
    case TYPES.SET_MOST_VISITED:
      return {
        ...state,
        mostVisited: payload,
      };
    case TYPES.SET_MOST_VISITED_LOADING:
      return {
        ...state,
        mostVisitedLoading: payload,
      };
    case TYPES.ADD_TO_LIST:
      return {
        ...state,
        user: {
          ...state.user,
          items: [payload, ...(state.user.items || [])],
        },
        // tracked so a newly added movie's cached stats get recomputed once
        // the list is actually persisted (see saveUserList); harmless no-op
        // if it was also recomputed immediately via the "+" icon's own save
        addedMovies: [...state.addedMovies, payload],
      };
    case TYPES.REORDER_LIST:
      const { oldIndex, newIndex } = payload;
      return {
        ...state,
        user: {
          ...state.user,
          items: arrayMove(
            state.user.items,
            oldIndex,
            newIndex
          ),
        },
        listOrdering: {
          oldIndex,
          newIndex,
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
        // tracked so the removed movie's cached stats can be recomputed
        // once the list is actually persisted (see SaveDelete.js)
        deletedMovies: [...state.deletedMovies, payload.movie],
      };
    case TYPES.CLEAR_DELETED_MOVIES:
      return {
        ...state,
        deletedMovies: [],
      };
    case TYPES.CLEAR_ADDED_MOVIES:
      return {
        ...state,
        addedMovies: [],
      };
    case TYPES.RESET_LIST_ORDERING:
      return {
        ...state,
        listOrdering: {
          oldIndex: null,
          newIndex: null,
        },
      };
    case TYPES.DELETE_LIST:
      return {
        ...state,
        user: {
          ...state.user,
          items: [],
        },
        deletedMovies: [],
        addedMovies: [],
        listOrdering: {
          oldIndex: null,
          newIndex: null,
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
    case TYPES.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload,
      };
    case TYPES.SET_NOTIFICATIONS_LOADING:
      return {
        ...state,
        notificationsLoading: payload,
      };
    case TYPES.MARK_ALL_NOTIFICATIONS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification => ({ ...notification, read: true })),
      };
    case TYPES.MARK_NOTIFICATION_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification._id === payload ? { ...notification, read: true } : notification
        ),
      };
    case TYPES.SET_USER_PREFERENCES:
      return {
        ...state,
        userPreferences: {
          ...state.userPreferences,
          ...payload,
        },
      };
    default:
      return state;
  }
};
