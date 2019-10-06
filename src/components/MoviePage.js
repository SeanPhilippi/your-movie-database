import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import Comments from './Comments';
import Rankings from './Rankings';
import CardWrapper from './HOCs/CardWrapper';
import withLoading from './HOCs/withLoading';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchMovieComments } from '../redux/actions';

const CommentsWithLoading = withLoading(Comments);

class MoviePage extends PureComponent {
  state = {
    movie: {
      title: '',
      year: '',
      poster: '',
      director: '',
      release_date: '',
      country: '',
      imdb_id: '',
      runtime: '',
      plot: '',
    },
    voters: []
  };

  componentDidMount() {
    // want a visible movie title slug in url for users
    // maybe don't need this for calls to server or calls to omdb api
    const { fetchMovieComments, location: { state: { movie } } } = this.props;
    axios(`/api/movies/id/${ movie.id }`)
      .then(({ data }) => {
        const fetchedMovie = {
          title: data.Title,
          year: data.Year,
          poster: data.Poster,
          director: data.Director,
          release_date: data.Released,
          country: data.Country,
          imdb_id: data.imdbID,
          runtime: data.Runtime,
          plot: data.Plot
        }
        this.setState({ movie: fetchedMovie });
      });
    fetchMovieComments(movie.id);
    // fetch movie rankings
    axios(`/api/movies/rankings/${ movie.id }`)
      .then(({ data }) => {
        this.setState({ voters: data.reverse() });
      });
  };

  render() {
    console.log('movie', this.props.location.state.movie)
    // * how I was bringing in movie data for this page (via Link on SortableItem)
    // const { movie } = this.props.location.state;
    // * dummy data for development
    const {
      voters,
      movie: {
        poster,
        title,
        director,
        year,
        country,
        runtime,
        plot
      }
    } = this.state;
    const {
      comments,
      commentsLoading
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
                <div className="mt-4">
                  <div className="font-weight-bold mb-1">
                    Statistics
                  </div>
                  <div className="bg-white">
                    <div className="d-flex justify-content-between">
                      <div className="bd-light row-height col-10">
                        Overall Ranking:
                      </div>
                      <div className="bd-light row-height col-2 text-right">
                        {/* rank */}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="bd-light row-height col-10">
                        Number of points:
                      </div>
                      <div className="bd-light row-height col-2 text-right">
                        {/* points */}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="bd-light row-height col-10">
                        Number of users that ranked this movie:
                      </div>
                      <div className="bd-light row-height col-2 text-right">
                        {/* number */}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="bd-light row-height col-10">
                        Average ranking in the user's list:
                      </div>
                      <div className="bd-light row-height col-2 text-right">
                        {/* avgRank */}
                      </div>
                    </div>
                  </div>
                </div>
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
                {/* <Comments/> */}
                <CommentsWithLoading
                  isLoading={ commentsLoading }
                  comments={ comments }
                />
              </CardWrapper>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MoviePage.propTypes = {
  movie: PropTypes.object.isRequired,
  fetchMovieComments: PropTypes.func.isRequired,
  commentsLoading: PropTypes.array,
  comments: PropTypes.array
}

const mapDispatchToProps = dispatch => ({
  fetchMovieComments: movie_id => dispatch(fetchMovieComments(movie_id)),
});

const mapStateToProps = state => ({
  commentsLoading: state.commentsLoading,
  comments: state.comments
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);