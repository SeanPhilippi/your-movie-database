import React from 'react';
import PropTypes from 'prop-types';
import withLoading from './HOCs/withLoading';

const MovieDetails = withLoading(({
  movie: {
    poster,
    title,
    director,
    year,
    country,
    runtime,
    imdbId,
    plot
  }
}) => (
  <div className="movie-page d-flex">
    <div className="poster">
      <img
        width={300}
        height={600}
        className="poster-img"
        src={ poster }
        alt={ title }
      />
    </div>
    {/* <div
      className="poster-img"
      style={{ backgroundImage: `url(${ poster })` }}
    >
    </div> */}
    <div>
      <div className="title">
        { title }
      </div>
      <div className="font-weight-bold">
        directed by <span className="director">{ director }</span>
      </div>
      <div>
        { country }, { year }
      </div>
      <div>
        { runtime }
      </div>
      <div>
        { plot }
      </div>
    </div>
  </div>
));

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
    imdbId: PropTypes.string,
    plot: PropTypes.string.isRequired,
  }),
};

export default MovieDetails;