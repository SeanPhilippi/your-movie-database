import React, { Component } from 'react';
import TopNav from '../TopNav/TopNav';
import './TopMovieList.css';

class TopMovieList extends Component {
  render() {
    return (
      <div className='top-movies-container'>
        <TopNav />
        <div className='top-movies'>
          <h1>Top Movie List, coming soon...</h1>
        </div>
      </div>
    )
  }
}

export default TopMovieList;