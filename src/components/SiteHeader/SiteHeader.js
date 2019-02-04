import React from 'react';
import TopNav from '../TopNav/TopNav';
import { NavLink } from 'react-router-dom';
import './SiteHeader.css';


class SiteHeader extends React.Component {

  render() {

    return (
      <header>
        <div className="logo">
          <NavLink to="/" className="logo-link">YMDB: Your Movie Database</NavLink>
        </div>
        <TopNav />
      </header>
    )
  }
}

export default SiteHeader;