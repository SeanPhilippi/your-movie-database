import React, { PureComponent } from 'react';
import './TopMovieList.css';

class TopMovieList extends PureComponent {
  render() {
    return (
      <div className="top-movies-container">
        <div className="top-movies">
          <h1 className="pb-4">Top Movie List, coming soon...</h1>
        </div>
      </div>
    )
  }
}

export default TopMovieList;