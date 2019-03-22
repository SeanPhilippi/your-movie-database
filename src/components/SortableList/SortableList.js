import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import { orderList, deleteMovie, fetchList, setProfileData } from '../../redux/actions';
import './SortableList.css';
import img from '../../images/grippy.png'

class SortableList extends Component {

  componentWillMount = () => {
    this.props.fetchList();
  }

  render() {
    console.log('props', this.props)
    const { list, orderList, deleteMovie } = this.props;

    const DragHandle = sortableHandle(() => {
      return (
        <div className="grip-container">
          <img alt='grip handle' style={{width: '.4rem'}}src={img}></img>
        </div>
      )
    });

    const SortableItem = sortableElement(({ movie, sortIndex }) => {
      return (

        <div
          key={movie.id}
          className="movie-item"
        >
          <div className='grip'>
            <DragHandle />
          </div>
          <div className="numbers">{sortIndex + 1} |</div>
          <div className="movie-info">
            <div style={{ fontSize: "20px" }}>
              <Link
                to={{
                  pathname: '/movie',
                  state: { movie: movie }
                }}
                // to={{
                //   pathname: `/movie/${movie}`,
                //   state: {
                //     id: movie.id,
                //     name: movie.name,
                //     director: movie.director,
                //     year: movie.year,

                //   }
                // }}
                className="movie-link">
                {movie.name}
              </Link>
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

  const SortableList = sortableContainer(({ items }) => {

    return (
      <div className="list-row" >
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
      </div>
    )
  })

  return (
      <div className="list-container">
        <SortableList
          helperClass='sortableHelper'
          items={list}
          useDragHandle
          onSortEnd={orderList}
          transitionDuration='300'
          lockAxis="y"
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  list: state.list,
  username: state.username
});

const mapDispatchToProps = dispatch => ({
  setList: () => dispatch(setProfileData()),
  fetchList: (list) => dispatch(fetchList(list)),
  orderList: ({ oldIndex, newIndex }) => dispatch(orderList(oldIndex, newIndex)),
  deleteMovie: (movie) => dispatch(deleteMovie(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableList);