import React from 'react';
import { connect } from 'react-redux';

import {

} from '../redux/actions';

class MoviePage extends React.Component {

  state = {};

  componentWillMount = () => {
    const {apiUrl, apiKey} = this.props;
    const {movie} = this.props.location.state;
    fetch(`${apiUrl}i=${movie.id}&apikey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        const newMovie = {};
        newMovie.name = data.Title;
        newMovie.year = data.Year;
        newMovie.released  = data.Released;
        newMovie.director = data.Director;
        newMovie.writer = data.Writer;
        newMovie.country = data.Country;
        newMovie.language = data.Language;
        newMovie.imdbID = data.imdbID;
        console.log('movie', newMovie);
        this.setState({movie: newMovie});
    })
  }

  render() {
    const { movie } = this.props.location.state;

    return (
      <div className="MoviePage">
        <h1>{movie.name}</h1>
        <h2>{movie.director}, {movie.year}</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, quidem.
          Quod magni animi dolore pariatur perferendis hic perspiciatis numquam dolores fuga
          quas ipsa, beatae aut vero quisquam sunt consectetur. Atque.
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({ 
  apiKey: state.apiKey,
  apiUrl: state.apiUrl
});

// const mapDispatchToProps = dispatch => ({

// });

export default connect (mapStateToProps)(MoviePage);