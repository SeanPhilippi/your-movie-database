import React from 'react';
import PropTypes from 'prop-types';

const SearchResult = ({ movie, handleAdd, handleRedirect }) => (
  <div
    className={handleRedirect ? 'movie-result-item' : 'result-item'}
    onClick={handleAdd ? () => handleAdd(movie) : () => handleRedirect(movie)}
  >
    <div className={handleRedirect ? 'movie-result-info' : 'result-info'}>
      {movie.Title} ({movie.Year})
    </div>
  </div>
);

SearchResult.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    imdbID: PropTypes.string,
  }),
  handleAdd: PropTypes.func,
  handleRedirect: PropTypes.func,
};

export default SearchResult;
