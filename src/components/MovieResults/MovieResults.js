import React from 'react';

class SearchResult extends React.Component {

  state = {

  }

  render() {
    return (
      <div key={movie.imdbID}>
        {movie.Title} ({movie.Year})
      </div>
    )
  }

}

export default SearchResult;