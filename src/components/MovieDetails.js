import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withLoading from './HOCs/withLoading';
import imdbLogo from '../images/imdb-logo.gif';
import plusIcon from '../images/plus-gold.png';
import { addToList } from '../redux/actions';

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
  addToList
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
          onClick={ () => addToList(movie) }
          className="d-flex add-movie"
        >
          <p className="font-weight-bold mr-1">
            Add to your list
          </p>
          <img
            src={ plusIcon }
            className="plus-gold"
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
};

const mapDispatchToProps = dispatch => ({
  addToList: movie => dispatch(addToList(movie)),
});

export default connect(null, mapDispatchToProps)(MovieDetails);