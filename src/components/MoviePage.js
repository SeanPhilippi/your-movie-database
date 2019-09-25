import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Comments from './Comments';
import CardWrapper from './HOCs/CardWrapper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    }
  };

  componentDidMount() {
    // want a visible movie title slug in url for users
    // maybe don't need this for calls to server or calls to omdb api
    const { location: { state: { movie } } } = this.props;
    fetch(`/api/movies/id/${ movie.id }`)
      .then(res => res.json())
      .then(data => {
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
  };

  render() {
    // * how I was bringing in movie data for this page (via Link on SortableItem)
    // const { movie } = this.props.location.state;
    // * dummy data for development
    const { poster, title, director, year, country, runtime, plot } = this.state.movie

    return (
      <div className="d-flex border-0 justify-content-center">
        <div className="bg-light2 inner-container mt-4">
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
                      <div className="bd-light row-height col-10">Overall Ranking:</div>
                      <div className="bd-light row-height col-2 text-right">rank</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="bd-light row-height col-10">Number of points:</div>
                      <div className="bd-light row-height col-2 text-right">points</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="bd-light row-height col-10">Number of users that ranked this movie:</div>
                      <div className="bd-light row-height col-2 text-right">number</div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div className="bd-light row-height col-10">Average ranking in the user's list:</div>
                      <div className="bd-light row-height col-2 text-right">avgRank</div>
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
            </div>
          </div>
          <div className="right-col">
            <div className="m-4">
              <CardWrapper
                icon="comments"
                title="comments"
                color="white"
              >
                <Comments className="comments" />
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
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(MoviePage);