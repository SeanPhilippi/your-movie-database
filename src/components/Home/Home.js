import React from 'react';
import SiteHeader from '../SiteHeader/SiteHeader';
import './Home.css';

function Home(props) {
  return (
    <div className='home-container'>
      <SiteHeader />
      <div className='home'>
        <h1>Landing Page, coming soon...</h1>
      </div>
    </div>
  )
}

export default Home;