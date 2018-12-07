import React from 'react';
import DraggableList from 'react-draggable-list'

class List extends React.Component {

  state = {
    list: ['movie1', 'movie2', 'movie3']
  }

  render() {

    return (
      <DraggableList list={this.state.list} />
    )
  }
}

export default List;