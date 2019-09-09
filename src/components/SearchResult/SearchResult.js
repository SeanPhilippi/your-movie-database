import React from 'react';
import PropTypes from 'prop-types';

const SearchResult = ({
  movie,
  movie: {
    imdbId,
    Title,
    Year,
  },
  handleAdd
}) => (
  <div
    key={ imdbId }
    className="result-item"
    onClick={ () => handleAdd(movie) }
  >
    <div className="result-info">
      { Title } ({ Year })
    </div>
  </div>
)

SearchResult.propTypes = {
  movie: PropTypes.object.isRequired,
  handleAdd: PropTypes.func.isRequired
}

export default SearchResult;