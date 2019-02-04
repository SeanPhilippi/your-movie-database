import React from 'react';
import { connect } from 'react-redux';
import './MoviePage.css';

import {

} from '../../redux/actions';

class MoviePage extends React.Component {

  state = {};

  render() {
    const { movie } = this.props.location.state;
    console.log('movie obj', movie)
    // const {movie} = this.state
    return (
      <div className="MoviePage">
        <h1>{movie.name}</h1>
        <h2>{movie.director}, {movie.year}</h2>
        <div>{movie.year} <br/>
        {movie.country} <br/>
        {movie.language} <br/>
        {movie.runtime}
        
        </div>
        <p>
          {movie.plot}
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({ 

});

export default connect (mapStateToProps)(MoviePage);