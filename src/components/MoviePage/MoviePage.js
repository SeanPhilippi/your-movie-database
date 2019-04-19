import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './MoviePage.css';

import {

} from '../../redux/actions';

class MoviePage extends React.PureComponent {

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

// MoviePage.propTypes = {
  
// }

const mapStateToProps = state => ({ 

});

export default connect (mapStateToProps)(MoviePage);