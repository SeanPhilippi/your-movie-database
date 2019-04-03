import axios from 'axios';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const TYPES = {
  GET_ERRORS: 'GET_ERRORS',
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  SET_UPDATE_STATUS: 'SET_UPDATE_STATUS',
  SET_DESCRIPT: 'SET_DESCRIPT',
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  CLEAR_SEARCH_TEXT: 'CLEAR_SEARCH_TEXT',
  SET_PROFILE_DATA: 'SET_PROFILE_DATA',
  ADD_TO_LIST: 'ADD_TO_LIST',
  CLEAR_SEARCH_RESULTS: 'CLEAR_SEARCH_RESULTS',
  REORDER_LIST: 'REORDER_LIST',
  DELETE_MOVIE: 'DELETE_MOVIE',
  DELETE_LIST: 'DELETE_LIST'
};
// convert back to fetch, or convert other fetches to axios
export const onRegister = (userData, history) => dispatch => {
  axios.post('api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err.response.data // * look at this
      })
    )
  // fetch('http://localhost:4300/api/users/register', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   // * unsure about this part
  //   body: JSON.stringify(userData)
  // })
  // .then(res => res.json())
  // .then(data => history.push('/login'))
  // .catch(err => console.log('error', err)
  //   dispatch({
  //   type: TYPES.GET_ERRORS,
  //   payload: err.response.data
  // })
  // )
}

export const loginUser = user => dispatch => {
  axios.post('/api/users/login', user)
    .then(res => {
      const { token } = res.data;
      // set token in localStorage
      localStorage.setItem('jwtToken', token);
      // set token to be in all axios headers
      setAuthToken(token);
      // decode the token
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err.response.data
      });
    });
};
// ! finish this, not being used yet
export const setCurrentUser = decoded => {
  return {
    type: TYPES.SET_CURRENT_USER,
    payload: decoded
  };
};

export const setUpdateStatus = () => ({
    type: TYPES.SET_UPDATE_STATUS
});

export const logoutUser = (history) => dispatch => {
  // remove JWT token from localStorage
  localStorage.removeItem('jwtToken');
  // remove JWT token from axios Authorization headers
  setAuthToken(false);
  // set current user back to empty object
  dispatch(setCurrentUser({}));
  // redirect to login page
  if (history) {
    history.push('/login');
  }
};

export const setDescript = text => ({
  type: TYPES.SET_DESCRIPT,
  payload: {
    text
  }
});

export const setSearchText = text => ({
  type: TYPES.SET_SEARCH_TEXT,
  payload: {
    text
  }
});

export const clearSearchText = () => ({
  type: TYPES.CLEAR_SEARCH_TEXT
})

export const fetchList = () => (dispatch, getState) => {
  const { username } = getState();
  console.log('username', username)
  fetch(`api/movies/${username}/list`)
    .then(res => res.json())
    .then(data => {
      console.log('username', username);
      console.log('data', data);
      dispatch(setProfileData(data))
    })
    .catch(err => console.error(err));
}

export const setProfileData = data => ({
  type: TYPES.SET_PROFILE_DATA,
  payload: {
    data
  }
});

export const addToList = movie => ({
  type: TYPES.ADD_TO_LIST,
  payload: {
    movie
  }
});

export const clearSearchResults = () => ({
  type: TYPES.CLEAR_SEARCH_RESULTS
})

export const orderList = (oldIndex, newIndex) => ({
  type: TYPES.REORDER_LIST,
  payload: {
    oldIndex, newIndex
  }
})

export const deleteMovie = movie => ({
  type: TYPES.DELETE_MOVIE,
  payload: {
    movie
  }
})

export const deleteList = () => ({
  type: TYPES.DELETE_LIST
});
