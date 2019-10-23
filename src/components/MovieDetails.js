import React from 'react';
import PropTypes from 'prop-types';
import withLoading from './HOCs/withLoading';
import imdbLogo from '../images/imdb-logo.gif';
import plusIcon from '../images/plus-light-orange.png';

const MovieDetails = withLoading(({
  movie,
  movie: {
    poster,
    title,
    director,
    year,
    country,
    runtime,
    imdbId,
    plot
  },
  handleAdd
}) => (
  <div className="movie-page d-flex">
    <div className="poster">
      <img
        width={ 300 }
        height={ 600 }
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
      <div className="d-flex justify-content-between">
        <div className="title">
          { title }
        </div>
        <a
          href={`http://www.imdb.com/title/${ imdbId }/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={ imdbLogo } alt="imdb-link"/>
        </a>
      </div>
      <div className="d-flex justify-content-between">
        <div className="font-weight-bold">
          directed by <span className="director">{ director }</span>
        </div>
        <div
          onClick={ () => handleAdd(movie, true) }
          className="d-flex add-movie"
        >
          <p className="mr-1">
            Add to your list
          </p>
          <img
            src={ plusIcon }
            className="plus-movie-page"
            alt="add movie"
          />
        </div>
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
  handleAdd: PropTypes.func.isRequired,
};

export default MovieDetails;