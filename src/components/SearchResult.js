import React from 'react';
import PropTypes from 'prop-types';

const SearchResult = ({
  movie,
  user,
  handleAdd,
  handleRedirect
}) => (
  <div
    key={ movie ? movie.imdbID : user._id }
    className={ handleRedirect ? "movie-result-item" : "result-item" }
    onClick={ handleAdd ? () => handleAdd(movie) : () => handleRedirect(movie) }
  >
    <div className={ handleRedirect ? "movie-result-info" : "result-info" }>
      { movie ? movie.Title : user.username } { movie && `(${ movie.Year })` }
    </div>
  </div>
);

SearchResult.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    imdbID: PropTypes.string
  }),
  user: PropTypes.shape({
    username: PropTypes.string,
    _id: PropTypes.string,
  }),
  handleAdd: PropTypes.func,
  handleRedirect: PropTypes.func,
};

export default SearchResult;