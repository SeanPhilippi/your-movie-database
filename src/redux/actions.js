import jwt_decode from 'jwt-decode';
import http from '../utils/http';
import axios from 'axios';
import setAuthToken from '../utils/auth/setAuthToken';

export const TYPES = {
  GET_ERRORS: 'GET_ERRORS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_NEW_USERS: 'SET_NEW_USERS',
  SET_TOKEN: 'SET_TOKEN',
  SET_UPDATE_STATUS: 'SET_UPDATE_STATUS',
  SET_EDITING: 'SET_EDITING',
  SET_STATEMENT: 'SET_STATEMENT',
  SET_LIST_DATA: 'SET_LIST_DATA',
  SET_AFFINITIES: 'SET_AFFINITIES',
  SET_COMMENTS: 'SET_COMMENTS',
  SET_MOVIE_STATS: 'SET_MOVIE_STATS',
  SET_TOP_MOVIES_LIST: 'SET_TOP_MOVIES_LIST',
  POST_COMMENT: 'POST_COMMENT',
  SET_COMMENTS_LOADING: 'SET_COMMENTS_LOADING',
  SET_LIST_DATA_LOADING: 'SET_LIST_DATA_LOADING',
  SET_MOVIE_STATS_LOADING: 'SET_MOVIE_STATS_LOADING',
  SET_AFFINITIES_LOADING: 'SET_AFFINITIES_LOADING',
  ADD_TO_LIST: 'ADD_TO_LIST',
  REORDER_LIST: 'REORDER_LIST',
  DELETE_MOVIE: 'DELETE_MOVIE',
  DELETE_LIST: 'DELETE_LIST',
  CLEAR_ERRORS: 'CLEAR_ERRORS'
};

// action creators
export const setToken = decoded => {
  console.log('decoded in setToken action', decoded)
  return {
    type: TYPES.SET_TOKEN,
    payload: decoded
  };
};

export const setNewUsers = users => ({
  type: TYPES.SET_NEW_USERS,
  payload: {
    users
  }
});

export const setUpdateStatus = () => ({
  type: TYPES.SET_UPDATE_STATUS
});

export const clearErrors = () => ({
  type: TYPES.CLEAR_ERRORS
});

export const setEditing = bool => ({
  type: TYPES.SET_EDITING,
  payload: bool
});

export const setStatement = text => ({
  type: TYPES.SET_STATEMENT,
  payload: {
    text
  }
});

export const setListData = listData => ({
  type: TYPES.SET_LIST_DATA,
  payload: listData
});

export const setComments = comments => ({
  type: TYPES.SET_COMMENTS,
  payload: comments
});

export const setAffinities = affinities => ({
  type: TYPES.SET_AFFINITIES,
  payload: affinities
});

export const setTopMoviesList = list => ({
  type: TYPES.SET_TOP_MOVIES_LIST,
  payload: list
});

export const setMovieStats = stats => ({
  type: TYPES.SET_MOVIE_STATS,
  payload: stats
});

export const setListDataLoading = bool => ({
  type: TYPES.SET_LIST_DATA_LOADING,
  payload: bool
});

export const setCommentsLoading = bool => ({
  type: TYPES.SET_COMMENTS_LOADING,
  payload: bool
});

export const setMovieStatsLoading = bool => ({
  type: TYPES.SET_MOVIE_STATS_LOADING,
  payload: bool
});

export const setAffinitiesLoading = bool => ({
  type: TYPES.SET_AFFINITIES_LOADING,
  payload: bool
});

//thunk actions

export const setCurrentUser = user => dispatch => {
  console.log('setCurrentUser', user);
  dispatch({
    type: TYPES.SET_CURRENT_USER,
    payload: user
  });

  if (user.email) {
    dispatch(fetchListData(user.username));
  } else {
    // setCurrentUser is called on logout, user should be set to an empty object
    // if empty object, clear user data
    dispatch(
      setListData({
        username: '',
        items: [],
        statement: ''
      })
    );
  };
};

export const postComment = comment => dispatch => {
  dispatch({
    type: TYPES.POST_COMMENT,
    payload: comment
  });
  // post to mongo after updating redux state with new comment and setting comments with the
  // new comments array
  axios.post('/api/comments/', comment)
    .then(res => res.json)
    .catch(console.log);
};

export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(() => {
      history.push('/login');
      dispatch(fetchNewUsers());
      dispatch(setEditing(true));
    })
    .catch(err => {
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const loginUser = (user, history) => dispatch => {
  console.log('logging in...')
  axios.post('/api/users/login', user)
    .then(res => {
      console.log('/login post res', res)
      const { token, user } = res.data;
      // set token in localStorage
      localStorage.setItem('jwtToken', token);
      // set token to be in all axios headers
      setAuthToken(token);
      // decode the token
      const decoded = jwt_decode(token);
      // set current user
      dispatch(setToken(decoded));
      // dispatch setUser
      dispatch(setCurrentUser(user));
      history.push('/profile');
    })
    .catch(err => {
      console.log('err', err.response.data)
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const fetchCurrentUser = () => dispatch => {
  axios('/api/users/current')
    .then(({ data }) => {
      console.log('user in fetchCurrentUser', data.user)
      dispatch(setCurrentUser(data.user));
    });
};

export const fetchNewUsers = () => dispatch => {
  axios('/api/users/new-registers')
    .then(({ data }) => {
      console.log('data in fetchNewUsers', data);
      dispatch(setNewUsers(data));
    });
};

export const fetchListData = username => dispatch => {
  dispatch(setListDataLoading(true));
  axios(`/api/movies/${ username }/list`)
    .then(({ data }) => {
      if (data) {
        let movieIds = data.items.map(item => item.id);
        dispatch(fetchAffinities(movieIds))
        dispatch(setListData(data));
      } else {
        dispatch(setAffinities([]));
        dispatch(setAffinitiesLoading(false));
        dispatch(setListData({
          username: username,
          statement: '',
          items: []
        }));
      };
      dispatch(setListDataLoading(false));
    });
};

export const fetchTopMoviesList = () => dispatch => {
  axios('/api/movies/top-movies-list')
  .then(({ data }) => {
    dispatch(setTopMoviesList(data));
  });
};

export const fetchAffinities = movieIds => dispatch => {
  console.log('fetchAffinities');
  dispatch(setAffinitiesLoading(true));
  axios.post('/api/movies/affinities', movieIds)
    .then(({ data }) => {
      console.log('affinities', data)
      dispatch(setAffinities(data));
      dispatch(setAffinitiesLoading(false));
    });
};

export const fetchComments = username => dispatch => {
  dispatch(setCommentsLoading(true));
  axios(`/api/comments/${ username }`)
    .then(({ data }) => {
      if (data) {
        dispatch(setComments(data));
      } else {
        console.log('there is no comments data')
        dispatch(setComments([]));
      };
      dispatch(setCommentsLoading(false));
    }).catch(console.log);
};

export const fetchMovieComments = movie_id => dispatch => {
  console.log('fetch movie comments')
  dispatch(setCommentsLoading(true));
  axios(`/api/comments/movie/${ movie_id }`)
    .then(({ data }) => {
      if (data) {
        dispatch(setComments(data));
      } else {
        console.log('there is no movie comments data')
        dispatch(setComments([]));
      };
      dispatch(setCommentsLoading(false));
    }).catch(console.log);
};

export const fetchTopMoviesComments = () => dispatch => {
  console.log('fetch top movies comments')
  dispatch(setCommentsLoading(true));
  axios('/api/comments/top-movies')
    .then(({ data }) => {
      console.log('top movies comments data', data)
      if (data) {
        dispatch(setComments(data));
      } else {
        console.log('there is no movie comments data')
        dispatch(setComments([]));
      };
      dispatch(setCommentsLoading(false));
    }).catch(console.log);
};

export const logoutUser = history => dispatch => {
  console.log('logging out...')
  // remove JWT token from localStorage
  localStorage.removeItem('jwtToken');
  // remove JWT token from axios Authorization headers
  setAuthToken(false);
  // set token back to empty object, passing in empty object will toggle isAuthenticated to false
  dispatch(setToken({}));
  // set current user back to empty object
  dispatch(setCurrentUser({}));
  dispatch(setEditing(false));
  if (history) {
    history.push('/');
  };
};

export const fetchMovieStats = (movie, update) => (dispatch, getState) => {
  const { topMoviesList } = getState();
  dispatch(setMovieStatsLoading(true));
  if (!movie.length) {
    let overallRanking;
    let movieIdx = topMoviesList.findIndex(item => item.id === movie.id);
    if (movieIdx > -1) {
      overallRanking = movieIdx + 1;
    } else {
      overallRanking = '';
    }
    axios(`/api/movies/rankings/${ movie.id }`)
      .then(({ data: { results, averageRanking, points } }) => {
        dispatch(setMovieStats({
          voters: results.reverse(),
          averageRanking,
          points,
          overallRanking,
        }));
        dispatch(setMovieStatsLoading(false));
        if (update) {
          const { id, title, year, director } = movie;
          dispatch(updateMovie({
            id,
            title,
            year,
            director,
            averageRanking,
            points,
            voters: results,
            overallRanking
          }));
        };
      });
  };
  if (movie.length) {
    const movies = movie;
    movies.forEach(movie => {
      const overallRanking = topMoviesList.findIndex(item => item.id === movie.id) + 1;
      axios(`/api/movies/rankings/${ movie.id }`)
        .then(({ data: { results, averageRanking, points } }) => {
          dispatch(setMovieStats({
            voters: results.reverse(),
            averageRanking,
            points,
            overallRanking,
          }));
          dispatch(setMovieStatsLoading(false));
          if (update) {
            const { id, title, year, director } = movie;
            dispatch(updateMovie({
              id,
              title,
              year,
              director,
              averageRanking,
              points,
              voters: results.reverse(),
              overallRanking,
            }));
          };
        });
    });
  };
};

export const addToList = movie => dispatch => {
  dispatch({
    type: TYPES.ADD_TO_LIST,
    payload: {
      movie
    }
  });
  dispatch(fetchMovieStats(movie, true));
};

export const orderList = (oldIndex, newIndex) => (dispatch, getState) => {
  const { items } = getState();
  console.log('old', oldIndex, 'new', newIndex)
  dispatch({
    type: TYPES.REORDER_LIST,
    payload: {
      oldIndex,
      newIndex
    }
  });
  const startIdx = Math.min(oldIndex, newIndex);
  const endIdx = Math.max(oldIndex, newIndex) + 1;
  const movies = [...items.slice(startIdx, endIdx)];
  dispatch(fetchMovieStats(movies, true));
};

export const deleteMovie = movie => dispatch => {
  dispatch({
    type: TYPES.DELETE_MOVIE,
    payload: {
      movie
    }
  });
  dispatch(fetchMovieStats(movie, true));
};

export const deleteList = movie => dispatch => {
  dispatch({
    type: TYPES.DELETE_LIST
  });
  dispatch(fetchMovieStats(movie, true));
};

export const updateMovie = movie => dispatch => {
  console.log('updating movie')
  axios.put(`/api/movies/update/${ movie.id }`, movie)
    .then(({ data }) => {
      console.log('updateMovie data', data)
      // parse data if needed, prob better to parse on backend
      // dispatch(setTopMoviesList(data));
    });
};