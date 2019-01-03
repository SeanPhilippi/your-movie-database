export const TYPES = {
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  SET_MOVIE_LIST: 'SET_MOVIE_LIST'
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
