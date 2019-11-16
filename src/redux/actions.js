import jwt_decode from 'jwt-decode';
import api from '../utils/api/api';
import setAuthToken from '../utils/auth/setAuthToken';

export const TYPES = {
  GET_ERRORS: 'GET_ERRORS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_NEW_USERS: 'SET_NEW_USERS',
  SET_TOKEN: 'SET_TOKEN',
  SET_MESSAGE_STATUS: 'SET_MESSAGE_STATUS',
  SET_EDITING: 'SET_EDITING',
  SET_STATEMENT: 'SET_STATEMENT',
  SET_AUTH_LIST_DATA: 'SET_AUTH_LIST_DATA',
  SET_LIST_DATA: 'SET_LIST_DATA',
  SET_AFFINITIES: 'SET_AFFINITIES',
  SET_COMMENTS: 'SET_COMMENTS',
  SET_MOVIE: 'SET_MOVIE',
  SET_MOVIE_STATS: 'SET_MOVIE_STATS',
  SET_TOP_MOVIES_LIST: 'SET_TOP_MOVIES_LIST',
  SET_CURRENT_TOP_MOVIES: 'SET_CURRENT_TOP_MOVIES',
  SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
  SET_MOVIES_PER_PAGE: 'SET_MOVIES_PER_PAGE',
  SET_NUM_OF_PAGES: 'SET_NUM_OF_PAGES',
  POST_COMMENT: 'POST_COMMENT',
  SET_COMMENTS_LOADING: 'SET_COMMENTS_LOADING',
  SET_LIST_DATA_LOADING: 'SET_LIST_DATA_LOADING',
  SET_MOVIE_DETAILS_LOADING: 'SET_MOVIE_DETAILS_LOADING',
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

export const clearErrors = () => ({
  type: TYPES.CLEAR_ERRORS
});

export const setEditing = bool => ({
  type: TYPES.SET_EDITING,
  payload: bool
});

export const setStatement = text => ({
  type: TYPES.SET_STATEMENT,
  payload: text
});

export const setAuthListData = listData => ({
  type: TYPES.SET_AUTH_LIST_DATA,
  payload: listData
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

export const setMovie = movie => ({
  type: TYPES.SET_MOVIE,
  payload: movie
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

export const setMovieDetailsLoading = bool => ({
  type: TYPES.SET_MOVIE_DETAILS_LOADING,
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

export const setCurrentPage = num => ({
  type: TYPES.SET_CURRENT_PAGE,
  payload: num
});

export const setMoviesPerPage = num => ({
  type: TYPES.SET_MOVIES_PER_PAGE,
  payload: num
});

//thunk actions

export const setMessageStatus = message => dispatch => {
  dispatch({
    type: TYPES.SET_MESSAGE_STATUS,
    payload: message
  });
  // set state.open back to false
  setTimeout(() =>
    dispatch({
      type: TYPES.SET_MESSAGE_STATUS,
      payload: message
    }), 2400);
};

export const setCurrentUser = user => dispatch => {
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
      setAuthListData({
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
  api.comments.post.comment(comment)
    .then(res => res.json)
    .catch(console.log);
};

export const registerUser = (userData, history) => dispatch => {
  api.users.post.newUser(userData)
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
  api.users.post.login(user)
    .then(res => {
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
  api.users.get.currentUser()
    .then(({ data }) => {
      dispatch(setCurrentUser(data.user));
    });
};

export const fetchNewUsers = () => dispatch => {
  api.users.get.newRegisters()
    .then(({ data }) => {
      dispatch(setNewUsers(data));
    });
};

export const fetchListData = (username, isAuthUser) => (dispatch, getState) => {
  // ! also do a check so the fetch only happens once for an auth user,
  // ! no need to fetch everytime, their listData will persist in Redux user object
  const { user: { username: authUser } } = getState();
  dispatch(setListDataLoading(true));
  api.list.get.userList(username)
    .then(({ data }) => {
      if (data) {
        const movieIds = data.items.map(item => item.id);
        dispatch(fetchAffinities(movieIds));
        if (username === authUser) {
          dispatch(setAuthListData(data));
        } else {
          dispatch(setListData(data));
        };
      } else {
        dispatch(setAffinities([]));
        dispatch(setAffinitiesLoading(false));
        if (username === authUser) {
          dispatch(setAuthListData({
            username: username,
            statement: '',
            items: []
          }));
        } else {
          dispatch(setListData({
            username: username,
            statement: '',
            items: []
          }));
        };
      };
      dispatch(setListDataLoading(false));
    });
};

export const fetchTopMoviesList = () => dispatch => {
  api.movies.get.topMoviesList()
    .then(({ data }) => {
      console.log('setting new top movies')
      // filter movies without points
      const filteredMovies = data.filter(movie => movie.points);
      dispatch(setTopMoviesList(filteredMovies));
    });
};

export const fetchAffinities = movieIds => dispatch => {
  dispatch(setAffinitiesLoading(true));
  api.list.post.affinities(movieIds)
    .then(({ data }) => {
      dispatch(setAffinities(data));
      dispatch(setAffinitiesLoading(false));
    });
};

export const fetchComments = username => dispatch => {
  dispatch(setCommentsLoading(true));
  api.comments.get.profileComments(username)
    .then(({ data }) => {
      if (data) {
        dispatch(setComments(data));
      } else {
        dispatch(setComments([]));
      };
      dispatch(setCommentsLoading(false));
    }).catch(console.log);
};

export const fetchMovieComments = movieId => dispatch => {
  dispatch(setCommentsLoading(true));
  api.comments.get.movieComments(movieId)
    .then(({ data }) => {
      if (data) {
        dispatch(setComments(data));
      } else {
        dispatch(setComments([]));
      };
      dispatch(setCommentsLoading(false));
    }).catch(console.log);
};

export const fetchTopMoviesComments = () => dispatch => {
  dispatch(setCommentsLoading(true));
  api.comments.get.topMoviesComments()
    .then(({ data }) => {
      if (data) {
        dispatch(setComments(data));
      } else {
        dispatch(setComments([]));
      };
      dispatch(setCommentsLoading(false));
    }).catch(console.log);
};

export const logoutUser = history => dispatch => {
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

export const fetchMovie = id => dispatch => {
  dispatch(setMovieDetailsLoading(true));
  api.movies.get.movie(id)
    .then(({
      data: {
        Title,
        Year,
        Poster,
        Director,
        Released,
        Country,
        imdbID,
        Runtime,
        Plot,
      }
    }) => {
      const movie = {
        title: Title,
        year: Year,
        poster: Poster,
        director: Director,
        release_date: Released,
        country: Country,
        imdbId: imdbID,
        runtime: Runtime,
        plot: Plot
      };
      dispatch(setMovie(movie));
      dispatch(setMovieDetailsLoading(false));
    }).catch(console.log);
};

export const fetchMovieStats = (movie, update) => async (dispatch, getState) => {
  const { topMoviesList } = getState();
  dispatch(setMovieStatsLoading(true));
  // if movie is an object (single movie)
  if (!movie.length) {
    let overallRanking;
    let movieIdx = topMoviesList.findIndex(item => item.id === movie.id);
    if (movieIdx > -1) {
      overallRanking = ++movieIdx;
    } else {
      overallRanking = '';
    };
    api.list.get.rankings(movie.id)
      .then(({ data: { results, averageRanking, points } }) => {
        console.log('points', points)
        dispatch(setMovieStats({
          voters: results.reverse(),
          averageRanking,
          points,
          overallRanking,
        }));
        if (update) {
          console.log('points in update', points)
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
      }).then(() => {
        dispatch(setMovieStatsLoading(false));
      });
  };
  // if multiple movies
  if (movie.length) {
    const movies = movie;
    movies.forEach(movie => {
      const overallRanking = topMoviesList.findIndex(item => item.id === movie.id) + 1;
      api.list.get.rankings(movie.id)
        .then(({ data: { results, averageRanking, points } }) => {
          console.log('points', points)
          dispatch(setMovieStats({
            voters: results.reverse(),
            averageRanking,
            points,
            overallRanking,
          }));
          if (update) {
            console.log('points in update', points)
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
    dispatch(setMovieStatsLoading(false));
  };
};

export const addToList = (movie, post) => async (dispatch, getState) => {
  const { user: { username, statement, items } } = getState();
  const listContainsMovie = (list, movie) => {
    return list.map(item => item.title).includes(movie.title);
  };
  const listIsFull = list => {
    return list.length > 19;
  };
  if (listContainsMovie(items, movie)) {
    dispatch(setMessageStatus('Your list already contains this movie!'));
    return Promise.resolve(false);
  };
  if (listIsFull(items)) {
    dispatch(setMessageStatus('Your list already has 20 items!'));
    return Promise.resolve(false);
  };
  const { data } = await api.movies.get.movie(movie.imdbId || movie.id);
  const movieObj = {
    title: data.Title,
    year: data.Year,
    director: data.Director,
    id: data.imdbID,
  };
  await dispatch({
    type: TYPES.ADD_TO_LIST,
    payload: movieObj
  });
  const { user: { items: list } } = getState();
  if (post) {
    const listObj = {
      username,
      items: [...list],
      statement
    };
    api.list.put.saveList(username, listObj)
      .then(res => res.json())
      .catch(console.log);
    dispatch(setMessageStatus('Add successful!'));
  };
  dispatch(fetchMovieStats(movieObj, true));
  return true;
};

export const orderList = (oldIndex, newIndex) => (dispatch, getState) => {
  const { user: { items } } = getState();
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
  console.log('movie updating')
  api.movies.put.movie(movie.id, movie)
    .then(() => {
      dispatch(fetchTopMoviesList());
    });
};

export const setCurrentTopMovies = () => (dispatch, getState) => {
  const { moviesPerPage, currentPage, topMoviesList } = getState();
  const startIdx = moviesPerPage * (currentPage - 1);
  const endIdx = startIdx + moviesPerPage;
  const currentTopMovies = topMoviesList.slice(startIdx, endIdx);
  // determine # of pages
  const numOfPages = Math.ceil(topMoviesList.length / moviesPerPage);
  const pages = Array.from(Array(numOfPages + 1).keys()).slice(1);
  dispatch({
    type: TYPES.SET_CURRENT_TOP_MOVIES,
    payload: currentTopMovies
  });
  dispatch({
    type: TYPES.SET_NUM_OF_PAGES,
    payload: pages
  });
};