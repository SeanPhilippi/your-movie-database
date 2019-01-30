import React from 'react';
import TopNav from './TopNav';


class SiteHeader extends React.Component {

  render() {

    return (
      <header>
        <div className="logo">
          YMDB: Your Movie Database
        </div>
        <TopNav />
      </header>
    )
  }
}

export default SiteHeader;