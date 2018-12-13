import React from 'react';
import DraggableList from 'react-draggable-list'

class List extends React.Component {

  state = {
    list: [
      {
        id: 1,
        title: 'movie1',
        year: 1999,
        director: 'Stanley Kubrick'
      },
      {
        id: 2,
        title: 'movie1',
        year: 1969,
        director: 'Luis Bunuel'
      },
      {
        id: 3,
        title: 'movie1',
        year: 1982,
        director: 'David Lynch'
      },
    ]
  }

  render() {

    return (
      <DraggableList list={this.state.list} />
    )
  }
}

export default List;