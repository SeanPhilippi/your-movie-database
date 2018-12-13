import React from 'react';
import TopNav from './TopNav';


class SiteHeader extends React.Component {

  render() {

    return (
      <header>
        YMDB: Your Movie Database
        <TopNav />
      </header>
    )
  }
}

export default SiteHeader;