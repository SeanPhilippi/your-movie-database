export const TYPES = {
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_MOVIE_LIST: 'SET_MOVIE_LIST',
  CLEAR_SEARCH_RESULTS: 'CLEAR_SEARCH_RESULTS',
  REORDER_LIST: 'REORDER_LIST',
  DELETE_MOVIE: 'DELETE_MOVIE',
  // SAVE_MOVIE_LIST: 'SAVE_MOVIE_LIST'
};

export const setSearchText = text => ({
  type: TYPES.SET_SEARCH_TEXT,
  payload: {
    text
  }
});

export const getSearchResults = () => (dispatch, getState) => {
  const { apiUrl, apiKey, searchText } = getState();

  fetch(`${apiUrl}s=${searchText}&apikey=${apiKey}`)
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

export const setMovieList = movie => ({
  type: TYPES.SET_MOVIE_LIST,
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

export const deleteMovie = (movie) => ({
  type: TYPES.DELETE_MOVIE,
  payload: {
    movie
  }
})

// export const saveList = () => ({
//   type: TYPES.SAVE_MOVIE_LIST
// })