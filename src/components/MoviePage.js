import React from 'react';
import { connect } from 'react-redux';

import {

} from '../redux/actions';

class MoviePage extends React.Component {

  render() {
    const { name, director, year } = this.props.history.location.state;

    return (
      <div className="MoviePage">
        <h1>{name}</h1>
        <h2>{director}, {year}</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur, quidem.
          Quod magni animi dolore pariatur perferendis hic perspiciatis numquam dolores fuga
          quas ipsa, beatae aut vero quisquam sunt consectetur. Atque.
        </p>
      </div>
    )
  }
}

// const mapStateToProps = state => ({ 

// });

// const mapDispatchToProps = dispatch => ({

// });

export default MoviePage;