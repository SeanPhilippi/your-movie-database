import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import { orderList, deleteMovie } from '../../redux/actions';
import img from '../../images/grippy.png';
import './SortableList.css';

class SortableList extends Component {
  render() {
    const { list, orderList, deleteMovie } = this.props;

    const DragHandle = sortableHandle(() => {
      return (
        <div className="grip-container">
          <img
            alt='grip handle'
            style={{ width: '.4rem' }}
            src={img}
          >
          </img>
        </div>
      )
    });

    const SortableItem = sortableElement(({ movie, sortIndex }) => {
      const {
        id,
        name,
        director,
        year,
      } = movie;

      return (
        <div
          key={id}
          className="movie-item"
        >
          <div className='grip'>
            <DragHandle />
          </div>
          <div className="numbers">
            { sortIndex + 1 } |
          </div>
          <div className="movie-info">
            <div style={{ fontSize: "20px" }}>
              <Link
                to={{
                  pathname: '/movie',
                  state: { movie }
                }}
                className="movie-link">
                { name }
              </Link>
            </div>
            <div className="dir-year">
              {director}, {year}
            </div>
          </div>
          <button
            onClick={() => deleteMovie(movie)}
            className="delete"
          >
            ✕
          </button>
        </div>
      )
    }
  );

    const SortableList = sortableContainer(({ items }) =>  (
      <div className="list-item" >
        {
          items.map((movie, index) => {
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
    ));

    return (
      <div className="list-container">
        <SortableList
          helperClass='sortableHelper'
          items={list}
          useDragHandle
          onSortEnd={orderList}
          transitionDuration={300}
          lockAxis="y"
        />
      </div>
    );
  }
}

SortableList.propTypes = {
  list: PropTypes.array.isRequired,
  orderList: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  list: state.list,
});

const mapDispatchToProps = dispatch => ({
  orderList: ({ oldIndex, newIndex }) => dispatch(orderList(oldIndex, newIndex)),
  deleteMovie: (movie) => dispatch(deleteMovie(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableList);
