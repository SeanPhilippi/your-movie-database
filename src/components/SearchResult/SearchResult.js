import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class SearchResult extends PureComponent {

  render() {
    // const { movie, movie: { imdbId, Title, Year }, user: { username, _id }, handleAdd } = this.props;
    const { movie, user, handleAdd } = this.props;
    return (
      <div
        key={ movie ? movie.imdbId : user._id }
        className="result-item"
        onClick={ () => handleAdd(movie) }
      >
      <div className="result-info">
        { movie ? movie.Title : user.username } { movie && `(${ movie.Year })` }
      </div>
    </div>
    )
  }
}


SearchResult.propTypes = {
  movie: PropTypes.object.isRequired,
  handleAdd: PropTypes.func.isRequired
}

export default SearchResult;