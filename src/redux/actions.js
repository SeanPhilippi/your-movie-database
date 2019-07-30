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
  SET_STATEMENT: 'SET_STATEMENT',
  SET_LIST: 'SET_LIST',
  ADD_TO_LIST: 'ADD_TO_LIST',
  REORDER_LIST: 'REORDER_LIST',
  DELETE_MOVIE: 'DELETE_MOVIE',
  DELETE_LIST: 'DELETE_LIST'
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

export const setStatement = text => ({
  type: TYPES.SET_STATEMENT,
  payload: {
    text
  }
});

export const setList = listData => ({
  type: TYPES.SET_LIST,
  payload: {
    listData
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

//thunk actions
export const setCurrentUser = user => dispatch => {
  console.log('setCurrentUser', user);
  dispatch({
    type: TYPES.SET_CURRENT_USER,
    payload: user
  });

  if (user.email) {
    dispatch(fetchList());
  } else {
    // setCurrentUser is called on logout, user should be set to an empty object
    // if empty object, clear user data
    dispatch(
      setList({
        username: '',
        list: [],
        statement: ''
      })
    );
  }
};

export const registerUser = (userData, history) => dispatch => {
  axios.post('api/users/register', userData)
    .then(() => history.push('/login'))
    .catch(err => {
      console.log('register err', err.response.data)
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err.response.data
      })
    })
};

export const loginUser = (user, history) => dispatch => {
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
      history.push('/');
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
    })
}

export const fetchList = () => (dispatch, getState) => {
  const { user } = getState();
  axios(`api/movies/${user.username}/list`)
    .then(res => {
      console.log('axios res in fetchList', res);
      if (res.data) dispatch(setList(res.data));
    })
    .catch(err => console.error(err));
};

export const logoutUser = history => dispatch => {
  // remove JWT token from localStorage
  localStorage.removeItem('jwtToken');
  // remove JWT token from axios Authorization headers
  setAuthToken(false);
  // set token back to empty object, passing in empty object will toggle isAuthenticated to false
  dispatch(setToken({}));
  // ! set current user back to empty object
  dispatch(setCurrentUser({}))
  if (history) {
    history.push('/login');
  }
};

