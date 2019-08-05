import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentColumn from '../CommentColumn/CommentColumn';
import CardWrapper from '../CardWrapper/CardWrapper';

import './MoviePage.css';

import {

} from '../../redux/actions';

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
  }

  // dummy data
  // state = {
  //   movie: {
  //     title: 'Eraserhead',
  //     director: 'David Lynch',
  //     year: '1977',
  //     ranking: '#184',
  //     points: 32345,
  //     numOfUsers: 232,
  //     imdb_url: 'http://www.imdb.com/title/tt0074486/',
  //     poster: 'https://m.media-amazon.com/images/M/MV5BMTQyNjMwMzA1MV5BMl5BanBnXkFtZTcwMzQyNDAxNg@@._V1_SX300.jpg'
  //   }
  // };

  componentDidMount() {
    // want a visible movie title slug in url for users
    // maybe don't need this for calls to server or calls to omdb api
    const { location: { state: { movie } } } = this.props;
    fetch(`/api/movies/id/${movie.id}`)
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
      })

  }

  render() {
    // * how I was bringing in movie data for this page (via Link on SortableItem)
    // const { movie } = this.props.location.state;
    // * dummy data for development
    const { poster, title, director, year, country, runtime, plot } = this.state.movie

    return (
      <div className="d-flex">
        <div className="w-50">
          <CardWrapper title="Movie Details" color="tan">
            <div className="movie-page d-flex">
              <div
                className="poster-img"
                style={{ backgroundImage: `url(${ poster })` }}
              >
              </div>
              <div>
                <div className="title">
                  { title }
                </div>
                <div className="director">
                  <small>directed by</small> { director }
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
            <div>
              <div className="font-weight-bold">
                Statistics
              </div>
              <div className="bg-white">
                <div className="d-flex justify-content-between">
                  <div className="bd-light col-10">Overall Ranking:</div>
                  <div className="bd-light col-2 text-right">rank</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="bd-light col-10">Number of points:</div>
                  <div className="bd-light col-2 text-right">points</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="bd-light col-10">Number of users that ranked this movie:</div>
                  <div className="bd-light col-2 text-right">number</div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="bd-light col-10">Average ranking in the user's list:</div>
                  <div className="bd-light col-2 text-right">avgRank</div>
                </div>
              </div>
            </div>
            // Review Box
            <div>
              <div className="font-weight-bold">
                Reviews
              </div>
              <div>
                Currently there is no review for this movie
              </div>
              <div>
                >> <a href="">Click here to add a review.</a>
              </div>
            </div>
          </CardWrapper>
        </div>
        <CardWrapper title="Comments" color="white">
          <CommentColumn />
        </CardWrapper>
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