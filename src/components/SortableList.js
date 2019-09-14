import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import { Link } from 'react-router-dom';
import { orderList, deleteMovie } from '../redux/actions';
import img from '../images/grippy.png';

class SortableList extends Component {
  render() {
    const { items, orderList, deleteMovie } = this.props;

    const DragHandle = sortableHandle(props => {
      return (
        <div
          className="grip d-flex align-items-center justify-content-between mr-2"
          style={{ width: '3.3rem' }}
        >
          <img
            className="mx-2"
            alt="grip handle"
            style={{ width: '.4rem', height: '1.2rem' }}
            src={ img }
          >
          </img>
          <div className="text-right">
            { props.sortIndex + 1 } |
          </div>
        </div>
      )
    });

    const SortableItem = sortableElement(({ movie, sortIndex }) => {
      const {
        id,
        title,
        director,
        year,
      } = movie;

      return (
        <div
          key={ id }
          className="bg-white"
          style={{ lineHeight: '2rem' }}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <DragHandle sortIndex={ sortIndex } />
              <div
                title={`${ title } (${ director }, ${ year })`}
                className="d-inline-block text-truncate"
                style={{ maxWidth: '510px' }}
              >
                {/* paste this to end of pathname after debugging disappearing movie titles: /${movie.title.concat('-', movie.year).split(' ').join('-')} */}
                <Link
                  className="movie-link"
                  to={{
                    pathname: '/movies',
                    state: { movie }
                  }}
                >
                  { title }&nbsp;
                </Link>
                ({ director }, { year })
              </div>
            </div>
            <button
              onClick={ () => deleteMovie(movie) }
              className="delete"
            >
              ✕
            </button>
          </div>
        </div>
      )
    });



    const SortableList = sortableContainer(({ items }) =>  (
      <div>
        {
          items.map((movie, index) => {
            return (
              <SortableItem
                className="sortable-item"
                key={ `item-${movie.id}` }
                sortIndex={ index }
                index={ index }
                movie={ movie }
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
          items={ items }
          useDragHandle
          onSortEnd={ orderList }
          transitionDuration={300}
          lockAxis="y"
        />
      </div>
    );
  }
}

SortableList.propTypes = {
  items: PropTypes.array.isRequired,
  orderList: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = dispatch => ({
  orderList: ({ oldIndex, newIndex }) => dispatch(orderList(oldIndex, newIndex)),
  deleteMovie: (movie) => dispatch(deleteMovie(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableList);
