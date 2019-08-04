import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import CommentColumn from '../CommentColumn/CommentColumn';
import CardWrapper from '../CardWrapper/CardWrapper';
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
      <div className="w-50">
        <CardWrapper title="Movie Details" color="tan">
          <div className="movie-page d-flex">
            <div
              className="poster-img"
              style={{ backgroundImage: `url(${ poster })` }}
            >
            </div>
            <div>
              <div className="title-year">
                { title } ({ year })
              </div>
              <div>
                { director }
              </div>
            </div>
          </div>
          <div className="w-50">
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