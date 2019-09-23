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
  // GET_LIST_DATA: 'GET_LIST_DATA', these aren't changing state?
  // GET_AFFINITIES: 'GET_AFFINITIES',
  // GET_COMMENTS: 'GET_COMMENTS',
  SET_COMMENTS: 'SET_COMMENTS',
  POST_COMMENT: 'POST_COMMENT',
  SET_COMMENTS_LOADING: 'SET_COMMENTS_LOADING',
  SET_LIST_DATA_LOADING: 'SET_LIST_DATA_LOADING',
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
// ! finish this idea
export const clearErrors = () => ({
  type: TYPES.CLEAR_ERRORS
});

export const setStatement = text => ({
  type: TYPES.SET_STATEMENT,
  payload: {
    text
  }
});

export const setListData = listData => ({
  type: TYPES.SET_LIST_DATA,
  payload: {
    listData
  }
});

export const setComments = comments => ({
  type: TYPES.SET_COMMENTS,
  payload: {
    comments
  }
});

export const addToList = movie => ({
  type: TYPES.ADD_TO_LIST,
  payload: {
    movie
  }
});

export const orderList = (oldIndex, newIndex) => ({
  type: TYPES.REORDER_LIST,
  payload: {
    oldIndex,
    newIndex
  }
});

export const deleteMovie = movie => ({
  type: TYPES.DELETE_MOVIE,
  payload: {
    movie
  }
});

export const deleteList = () => ({
  type: TYPES.DELETE_LIST
});

export const setListDataLoading = () => ({
  type: TYPES.SET_LIST_DATA_LOADING
});

export const setCommentsLoading = () => ({
  type: TYPES.SET_COMMENTS_LOADING
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
  }
};

export const registerUser = (userData, history) => dispatch => {
  axios.post('api/users/register', userData)
    .then(() => {
      history.push('/login')
    })
    .catch(err => {
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const loginUser = (user, history) => dispatch => {
  console.log('logging in...')
  axios.post('api/users/login', user)
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
  axios('api/users/current')
    .then(({ data }) => {
      console.log('user in fetchCurrentUser', data.user)
      dispatch(setCurrentUser(data.user));
    });
};

export const fetchListData = username => dispatch => {
  axios(`api/movies/${ username }/list`)
    .then(res => {
      console.log('axios res in fetchListData', res);
      if (res.data) dispatch(setListData(res.data));
    })
    .catch(err => console.error(err));
};
// ! unfinished
export const postComment = comment => (dispatch, getState) => {
  const { comments } = getState;
  dispatch({
    type: TYPES.POST_COMMENT,
    payload: comment
  });
  dispatch(setComments(comments));
  // post to mongo after updating redux state with new comment and setting comments with the
  // new comments array
  axios.post('/api/comments/', comment)
    .then(res => res.json)
    .catch(console.log);
};

export const getVisitedListData = () => (dispatch, getState) => {

}

export const getAffinities = () => (dispatch, getState) => {

}

export const getComments = username => dispatch => {
  axios.get(`/api/comments/${ username }`)
  .then(res => res.json())
  .then(data => {
    if (data) {
      dispatch(setComments(data));
    }
    dispatch(setCommentsLoading(false));
    // this.setState({ commentsLoading: false });
  }).catch(console.log);
}

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
  if (history) {
    history.push('/');
  };
};

