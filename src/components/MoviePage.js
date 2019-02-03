import React from 'react';
import { connect } from 'react-redux';

import {

} from '../redux/actions';

class MoviePage extends React.Component {

  state = {};

  // componentWillMount = () => {
    // maybe grab all this info and create this object in add function, instead of here.  
  //   const {apiKey} = this.props;
  //   const {movie} = this.props.location.state;
  //   fetch(`http://www.omdbapi.com/?i=${movie.id}&apikey=${apiKey}`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log('data', data);
  //       const newMovie = {};
  //       newMovie.name = data.Title;
  //       newMovie.year = data.Year;
  //       newMovie.released  = data.Released;
  //       newMovie.director = data.Director;
  //       newMovie.writer = data.Writer;
  //       newMovie.country = data.Country;
  //       newMovie.language = data.Language;
  //       newMovie.imdbID = data.imdbID;
  //       console.log('movie', newMovie);
  //       this.setState({movie: newMovie});
  //   })
  // }

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
  // apiKey: state.apiKey
  // movie: state.movie
});

// const mapDispatchToProps = dispatch => ({

// });

export default connect (mapStateToProps)(MoviePage);