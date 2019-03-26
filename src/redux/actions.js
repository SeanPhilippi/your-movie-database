import axios from 'axios';

export const TYPES = {
  GET_ERRORS: 'GET_ERRORS',
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
// ! left off here, POST not found, wrong proxy of 3001, should be 4300
export const onRegister = (userData, history) => dispatch => {
  axios.post('api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: TYPES.GET_ERRORS,
        payload: err.response.data
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

// dispatch and getState are functions made allowable by redux-thunk redux-thunk allows action 
// objects returned by action-creators to return their own actions and perform actions such as api 
// calls that will now be executed when they are processed by the rootReducer
export const getResults = (num) => (dispatch, getState) => {
  const { searchText } = getState();
  const apiKey = process.env.API_KEY;

  fetch(`http://www.omdbapi.com/?s=${searchText.trim()}&apikey=${apiKey}&page=${num}`)
    .then(res => res.json())
    .then(data => {
      dispatch(setSearchResults(data.Search))
    })
    .catch(err => console.error(err));
}

export const setSearchResults = data => ({
  type: TYPES.SET_SEARCH_RESULTS,
  payload: {
    data
  }
});

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
