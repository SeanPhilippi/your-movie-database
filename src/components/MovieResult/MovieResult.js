import React from 'react';
import PropTypes from 'prop-types';

const MovieResult = ({ movie, handleAdd }) => {
  const { imdbId, Year, Title } = movie;
  return (
    <div
      key={ imdbId }
      className="result-item"
      onClick={() => handleAdd(movie)}
    >
      <div className="result-info">
        { Title } ({ Year })
      </div>
    </div>
  )
}

MovieResult.propTypes = {
  movie: PropTypes.object.isRequired,
  handleAdd: PropTypes.func.isRequired
}

export default MovieResult;