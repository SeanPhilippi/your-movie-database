import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MovieDetails from './MovieDetails';
import Comments from './Comments';
import Rankings from './Rankings';
import MovieStats from './MovieStats';
import CardWrapper from './HOCs/CardWrapper';
import withLoading from './HOCs/withLoading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  fetchMovieComments,
  fetchMovie,
  fetchMovieStats,
} from '../redux/actions';

const CommentsWithLoading = withLoading(Comments);

class MoviePage extends PureComponent {

  componentDidMount() {
    const {
      fetchMovieComments,
      fetchMovie,
      fetchMovieStats,
      location: {
        state: { movie }
      }
    } = this.props;
    fetchMovie(movie.id);
    fetchMovieComments(movie.id);
    fetchMovieStats(movie, true);
  };

  render() {
    console.log('location.state.movie', this.props.location.state.movie)
    // * how I was bringing in movie data for this page (via Link on SortableItem)
    // const { movie } = this.props.location.state;
    const {
      comments,
      commentsLoading,
      movieStatsLoading,
      movieDetailsLoading,
      movie,
      movie: {
        title,
      },
      stats,
      stats: {
        voters
      }
    } = this.props;

    return (
      <div className="d-flex border-0 justify-content-center">
        <div className="bg-light2 inner-container-movie mt-4">
          {/* Left Column */}
          <div className="left-col bg-white pb-3 pb-md-0">
            <div className="px-4 pt-2 pt-md-4 w-100">
              <CardWrapper
                icon="film"
                rotate={ -5 }
                title="Movie Details"
                color="tan"
                marginTopVal="0"
              >
                <MovieDetails
                  isLoading={ movieDetailsLoading }
                  movie={ movie }
                />
                <MovieStats
                  isLoading={ movieStatsLoading }
                  stats={ stats }
                />
                {/* Review Box */}
                <div>
                  <div className="font-weight-bold mt-2">
                    Reviews
                  </div>
                  <div>
                    Currently there are no reviews for this movie.
                  </div>
                  <div>
                    <FontAwesomeIcon icon="chevron-right" /> &nbsp;<a href="/reviews">Click here to add a review.</a>
                  </div>
                </div>
              </CardWrapper>
              {/* -------Rankings------- */}
              <CardWrapper
                icon="vote-yea"
                title="Rankings"
                color="tan"
              >
                <Rankings
                  isLoading={ movieStatsLoading }
                  title={ title }
                  voters={ voters }
                />
              </CardWrapper>
            </div>
          </div>
          {/* Right Column */}
          <div className="right-col w-100">
            <div className="m-4">
              <CardWrapper
                icon="comments"
                title="comments"
                color="white"
              >
                <CommentsWithLoading
                  isLoading={ commentsLoading }
                  comments={ comments }
                />
              </CardWrapper>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

MoviePage.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  stats: PropTypes.shape({
    voters: PropTypes.array
  }).isRequired,
  fetchMovieComments: PropTypes.func.isRequired,
  commentsLoading: PropTypes.bool,
  comments: PropTypes.array
};

const mapDispatchToProps = dispatch => ({
  fetchMovieComments: movie_id => dispatch(fetchMovieComments(movie_id)),
  fetchMovie: id => dispatch(fetchMovie(id)),
  fetchMovieStats: (movie, update) => dispatch(fetchMovieStats(movie, update)),
});

const mapStateToProps = state => ({
  movie: state.movie,
  commentsLoading: state.commentsLoading,
  movieDetailsLoading: state.movieDetailsLoading,
  movieStatsLoading: state.movieStatsLoading,
  comments: state.comments,
  stats: state.movieStats,
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);