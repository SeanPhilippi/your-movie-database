import React, { Component } from 'react';

class ListHeader extends React.Component {

  render() {

    return (
      <header>
        {listName} by {userName}
      </header>
    )
  }
}

export default ListHeader;