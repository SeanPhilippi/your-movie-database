import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './MoviePage.css';
import axios from 'axios';

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
    }
  };

  componentDidMount() {
    const { match: { params } } = this.props;
    let slug = params.slug;


    axios.get(`/movies/${slug}`)

  }

  render() {
    // * how I'm actually going to bring in movie data for this page
    // const { movie } = this.props.location.state;
    // * dummy data for development
    const { movie } = this.state

    return (
      <div className="MoviePage">
        <h1>
          { movie.title }
        </h1>
          <h2>
          { movie.director }, { movie.year }
        </h2>
        <div>
          { movie.year } <br/>
          { movie.country } <br/>
          { movie.language } <br/>
          { movie.runtime }
        </div>
        <p>
          {movie.plot}
        </p>
      </div>
    )
  }
}

MoviePage.propTypes = {

}

const mapStateToProps = state => ({

});

export default connect (mapStateToProps)(MoviePage);