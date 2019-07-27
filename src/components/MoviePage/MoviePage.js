import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
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

        <div className="w-50">
          <div className="border">
            Statistics
          </div>
          <div className="d-flex justify-content-between bg-white border">
            <div>
              <div>
                Overall ranking:
              </div>
              <div>
                Number of points:
              </div>
              <div>
                Number of users that ranked this movie:
              </div>
              <div>
                Average Ranking in the users lists:
              </div>
            </div>
            <div className="text-right">
              <div>
                #184
              </div>
              <div>
                4219
              </div>
              <div>
                362
              </div>
              <div>
                #9
              </div>
            </div>
          </div>
        </div>

        <Row>
          <Row>
            Reviews
          </Row>
          <p>
            Currently, there is no review for this movie.
          </p>
          <Row>
            <span>>></span><a href="">Click here to add a review</a>
          </Row>
          <Row className="review-box">

          </Row>
        </Row>

        {/* <Container clasName="voters-container">
          <Col className="voters">
            // { this.props.users.map(user => {
              return <Link>user.username</Link>
            }) }
          </Col>
          <Col className="rank">
            {
              this.props.rankings.map(user => {
                return (
                  <span> // search this user's list array, then use indexOf(state.title) on Object.values of that user's list?

                  </span>
                )
              })
            }
          </Col>
        </Container> */}

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