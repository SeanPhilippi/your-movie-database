export const TYPES = {
  SET_DESCRIPT: 'SET_DESCRIPT',
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  FETCH_MOVIE_LIST: 'FETCH_MOVIE_LIST',
  SET_MOVIE_LIST: 'SET_MOVIE_LIST',
  ADD_TO_LIST: 'ADD_TO_LIST',
  CLEAR_SEARCH_RESULTS: 'CLEAR_SEARCH_RESULTS',
  REORDER_LIST: 'REORDER_LIST',
  DELETE_MOVIE: 'DELETE_MOVIE',
  DELETE_MOVIE_LIST: 'DELETE_MOVIE_LIST'
};

export const setDescript = text => ({
  type: TYPES.SET_DESCRIPT,
  payload: {
    text
  }
})

export const setSearchText = text => ({
  type: TYPES.SET_SEARCH_TEXT,
  payload: {
    text
  }
});

export const getResults = (num) => (dispatch, getState) => {
  const { apiUrl, apiKey, searchText } = getState();

  fetch(`${apiUrl}s=${searchText.trim()}&apikey=${apiKey}&page=${num}`)
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
  fetch(`/${username}/list`)
    .then(res => res.json())
    .then(data => {
      console.log('username', username);
      console.log('data', data);
      dispatch(setFetchedList(data))
    })
    .catch(err => console.error(err));
}

export const setFetchedList = data => ({
  type: TYPES.SET_MOVIE_LIST,
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
  type: TYPES.DELETE_MOVIE_LIST
});
