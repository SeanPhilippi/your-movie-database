import React, { Component } from 'react';
import TopNav from './components/TopNav';


class SiteHeader extends React.Component {

  redner() {

    return (
      <header>
        YMDB: Your Movie Database
        <TopNav />
      </header>
    )
  }
}

export default SideHeader;