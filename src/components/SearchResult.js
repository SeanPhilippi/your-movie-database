import React from 'react';
import PropTypes from 'prop-types';

const SearchResult = ({
  movie,
  movie: {
    imdbId,
    Title,
    Year
  },
  user: {
    username,
    _id,
  },
  handleAdd
}) => (
  <div
    key={ movie ? imdbId : _id }
    className="result-item"
    onClick={ () => handleAdd(movie) }
  >
    <div className="result-info">
      { movie ? Title : username } { movie && `(${ Year })` }
    </div>
  </div>
);

SearchResult.propTypes = {
  movie: PropTypes.object.isRequired,
  handleAdd: PropTypes.func.isRequired
};

export default SearchResult;