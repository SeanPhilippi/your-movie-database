import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  setMovieStatsLoading
} from '../redux/actions';

const CommentsWithLoading = withLoading(Comments);

class MoviePage extends PureComponent {

  componentDidMount() {
    const {
      fetchMovieComments,
      fetchMovie,
      fetchMovieStats,
      setMovieStatsLoading,
      location: {
        state: { movie }
      }
    } = this.props;
    setMovieStatsLoading(true);
    fetchMovie(movie.id)
    fetchMovieComments(movie.id);
    fetchMovieStats(movie);
  };

  render() {
    console.log('location.state.movie', this.props.location.state.movie)
    // * how I was bringing in movie data for this page (via Link on SortableItem)
    // const { movie } = this.props.location.state;
    const {
      comments,
      commentsLoading,
      movieStatsLoading,
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
      stats: {
        voters,
        averageRanking,
        points,
        overallRanking,
      }
    } = this.props;

    return (
      <div className="d-flex border-0 justify-content-center">
        <div className="bg-light2 inner-container mt-4">
          {/* Left Column */}
          <div className="left-col bg-white">
            <div className="px-4 pt-4 w-100">
              <CardWrapper
                icon="film"
                rotate={ -5 }
                title="Movie Details"
                color="tan"
                marginTopVal="0"
              >
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
                <MovieStats
                  voters={ voters }
                  averageRanking={ averageRanking }
                  points={ points }
                  overallRanking={ overallRanking }
                  isLoading={ movieStatsLoading }
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
                    <FontAwesomeIcon icon="chevron-right" /> &nbsp;<a href="#">Click here to add a review.</a>
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
          <div className="right-col">
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
  movie: PropTypes.object.isRequired,
  stats: PropTypes.object.isRequired,
  fetchMovieComments: PropTypes.func.isRequired,
  commentsLoading: PropTypes.bool,
  movieStatsLoading: PropTypes.bool,
  comments: PropTypes.array
};

const mapDispatchToProps = dispatch => ({
  fetchMovieComments: movie_id => dispatch(fetchMovieComments(movie_id)),
  fetchMovie: id => dispatch(fetchMovie(id)),
  fetchMovieStats: (movie, update) => dispatch(fetchMovieStats(movie, update)),
  setMovieStatsLoading: bool => dispatch(setMovieStatsLoading(bool)),
});

const mapStateToProps = state => ({
  movie: state.movie,
  commentsLoading: state.commentsLoading,
  movieStatsLoading: state.movieStatsLoading,
  comments: state.comments,
  stats: state.movieStats,
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);