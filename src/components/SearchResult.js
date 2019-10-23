import React from 'react';
import PropTypes from 'prop-types';

const SearchResult = ({
  movie,
  user,
  handleAdd
}) => (
  <div
    key={ movie ? movie.imdbID : user._id }
    className="result-item"
    onClick={ () => handleAdd(movie) }
  >
    <div className="result-info">
      { movie ? movie.Title : user.username } { movie && `(${ movie.Year })` }
    </div>
  </div>
);

SearchResult.propTypes = {
  movie: PropTypes.object.isRequired,
  handleAdd: PropTypes.func.isRequired
};

export default SearchResult;