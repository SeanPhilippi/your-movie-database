import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { orderList, deleteMovie } from '../redux/actions';

const liStyle = {
  fontSize: '15px',
  border: 'black solid 1px',
  margin: 'auto',
  paddingTop: '2px',
  paddingBottom: '2px',
  marginTop: '10px',
  marginBottom: '10px',
  display: 'block',
  width: '42%'
};

const buttonStyle = {
  fontSize: '20px',
  // border: 'black solid 2px',
  float: 'right',
  marginRight: '5px',
  padding: '0 7px 3px 7px'
}



class SortableComponent extends Component {

  render() {
    console.log('props', this.props)
    const { list, onSortEnd, deleteMovie } = this.props;

    const SortableItem = SortableElement(({ movie }) => {
      return (

        <div key={movie.id} style={liStyle} >
          <span style={{ fontSize: "20px" }}>{movie.name}</span>
          {/* delete button */}
          <button onClick={() => deleteMovie(movie)} style={buttonStyle}>x</button>
          <br />
          {movie.director}, {movie.year}
        </div>
      )
    }
    )

    const SortableList = SortableContainer(({ items }) => {
      // debugger;
      return (
        <ul className="row" >
          {
            items.map((movie, index) => {
              console.log('movie1', movie);
              return <SortableItem key={`item-${movie.id}`} index={index} movie={movie} />
            })
          }
        </ul>
      )
    })

    return <SortableList items={list} onSortEnd={onSortEnd} axis="y" />;
  }
}

const mapStateToProps = state => ({
  list: state.list
});

const mapDispatchToProps = dispatch => ({
  orderList: (oldIndex, newIndex) => dispatch(orderList(oldIndex, newIndex)),
  deleteMovie: (movie) => dispatch(deleteMovie(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableComponent);