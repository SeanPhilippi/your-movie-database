import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { orderList, deleteMovie } from '../redux/actions';
import './Profile.css';

class SortableComponent extends Component {

  // update a list
  handleChange = () => {
    fetch('/:user/:listId/update', {
      method: 'PUT',
      // to be continued
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  render() {
    console.log('props', this.props)
    const { list, orderList, deleteMovie } = this.props;

    const SortableItem = SortableElement(({ movie, sortIndex }) => {
      return (

        <div
          key={movie.id}
          className="movie-item"
        >
          <div className="numbers">{sortIndex + 1} |</div>
          <div className="movie-info">
            <div style={{ fontSize: "20px" }}>
              {movie.name}
            </div>
            <div className="dir-year">
              {movie.director}, {movie.year}
            </div>
          </div>
          {/* delete button */}
          <button
            onClick={() => deleteMovie(movie)}
            className="delete"
          >
            ✕
          </button>
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
              return (
                <SortableItem
                  className="sortable-item"
                  key={`item-${movie.id}`}
                  sortIndex={index}
                  index={index}
                  movie={movie}
                />
              )
            })
          }
        </ul>
      )
    })

    return (
      <SortableList
        helperClass='sortableHelper'
        // className="sortable-list" 
        items={list}
        onSortEnd={orderList}
        axis="y"
      />
    )
  }
}

const mapStateToProps = state => ({
  list: state.list
});

const mapDispatchToProps = dispatch => ({
  orderList: ({ oldIndex, newIndex }) => dispatch(orderList(oldIndex, newIndex)),
  deleteMovie: (movie) => dispatch(deleteMovie(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableComponent);