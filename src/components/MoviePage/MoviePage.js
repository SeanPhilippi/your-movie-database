import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentColumn from '../CommentColumn/CommentColumn';
import axios from 'axios';

import './MoviePage.css';

import {

} from '../../redux/actions';

class MoviePage extends PureComponent {

  state = {
    movie: {
      title: 'Eraserhead',
      director: 'David Lynch',
      year: '1977',
      ranking: '#184',
      points: 32345,
      numOfUsers: 232,
      languages: ['English'],
      imdb_url: 'http://www.imdb.com/title/tt0074486/',
      poster: 'https://m.media-amazon.com/images/M/MV5BMTQyNjMwMzA1MV5BMl5BanBnXkFtZTcwMzQyNDAxNg@@._V1_SX300.jpg'
    }
  };

  componentDidMount() {
    // want a visible movie title slug in url for users
    // maybe don't need this for calls to server or calls to omdb api
    const { match: { params } } = this.props;
    let slug = params.slug;


    axios.get(`/movies/${slug}`)

  }

  render() {
    // * how I was bringing in movie data for this page (via Link on SortableItem)
    // const { movie } = this.props.location.state;
    // * dummy data for development
    const { poster, title, director, year, country, language, runtime, plot } = this.state.movie

    return (
      <div className="movie-page">
        <div
          className="poster-img"
          style={{ backgroundImage: `url(${ poster })` }}
        >
        </div>
        <div className="movie-info">
          <h1>
            { title }
          </h1>
            <h2>
            { director }, { year }
          </h2>
        </div>

        <div className="border bg-white">
          Statistics
        </div>
        <div>
          <div>
            <div>
              Overall ranking:
            </div>
            <div>
              #184
            </div>
          </div>
          <div>
            <div>
              Number of points
            </div>
            <div>
              4219
            </div>
          </div>
          <div>
            <div>
              Number of users that ranked this movie
            </div>
            <div>
              362
            </div>
          </div>
          <div>
            <div>
              Average ranking in the users list
            </div>
            <div>
              #9
            </div>
          </div>
        </div>

        <div>
          <div>
            Reviews
          </div>
          <p>
            Currently, there is no review for this movie.
          </p>
          <div>
            <span>>></span><a href="">Click here to add a review</a>
          </div>
          <div className="review-box">

          </div>
        </div>

        <div>
          <div>
            Voters
          </div>
          <div>
            Users that ranked { title }
          </div>
          <div className="user-list-rankings">
            <div>
              Rory Carson
            </div>
            <div>
              #5 in the list
            </div>
            <div>
              Rory Carson
            </div>
            <div>
              #5 in the list
            </div>
            <div>
              Rory Carson
            </div>
            <div>
              #5 in the list
            </div>
            <div>
              Rory Carson
            </div>
            <div>
              #5 in the list
            </div>
            <div>
              Rory Carson
            </div>
            <div>
              #5 in the list
            </div>
            <div>
              Rory Carson
            </div>
            <div>
              #5 in the list
            </div>
            <div>
              Rory Carson
            </div>
            <div>
              #5 in the list
            </div>
            <div>
              Rory Carson
            </div>
            <div>
              #5 in the list
            </div>
            <div>
              Rory Carson
            </div>
            <div>
              #5 in the list
            </div>
            <div>
              Rory Carson
            </div>
            <div>
              #5 in the list
            </div>
          </div>
        </div>

        {/* <div>
          { year } <br/>
          { country } <br/>
          { language } <br/>
          { runtime }
        </div> */}
        <p>
          { plot }
        </p>
        <CommentColumn />
      </div>
    )
  }
}

MoviePage.propTypes = {

}

const mapStateToProps = state => ({

});

export default connect (mapStateToProps)(MoviePage);