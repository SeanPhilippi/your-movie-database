import React from 'react';
import TopNav from '../TopNav/TopNav';
import './Home.css';

function Home(props) {
  return (
    <div className='home-container'>
      <TopNav />
      <div className='home'>
        <h1>Landing Page, coming soon...</h1>
      </div>
    </div>
  )
}

export default Home;