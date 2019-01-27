import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { orderList, deleteMovie, fetchList, setFetchedList } from '../redux/actions';
import './Profile.css';

class SortableList extends Component {

  componentDidMount = () => {
    this.props.fetchList()
    // fetch('/list')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log('data', data);
    // this.setState({ list: data })
  }

  // onTextChange = e => {
  //   this.setState({ searchText: e.target.value });
  // }

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
        <div className="list-row" >
          {
            items.map((movie, index) => {
              console.log('movie1', movie);
              return (
                <SortableItem
                  // className="sortable-item"
                  key={`item-${movie.id}`}
                  sortIndex={index}
                  index={index}
                  movie={movie}
                />
              )
            })
          }
        </div>
      )
    })

    return (
      <div className="list-container">
        <SortableList
          helperClass='sortableHelper'
          // className="sortable-list" 
          items={list}
          onSortEnd={orderList}
          lockAxis="y"
          lockToContainerEdges={true}
          helperContainer={document.body.getElementsByClassName('list-container')[0]}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.list
});

const mapDispatchToProps = dispatch => ({
  setList: () => dispatch(setFetchedList()),
  fetchList: (list) => dispatch(fetchList(list)),
  orderList: ({ oldIndex, newIndex }) => dispatch(orderList(oldIndex, newIndex)),
  deleteMovie: (movie) => dispatch(deleteMovie(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableList);