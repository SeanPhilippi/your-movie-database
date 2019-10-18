import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';
import {
  orderList,
  deleteMovie
} from '../../../redux/actions';

class EditableList extends Component {
  render() {
    const { items, orderList, deleteMovie } = this.props;

    const SortableList = sortableContainer(({ items }) => (
      <div>
        {
          items.map((movie, index) => {
            return (
              <SortableItem
                deleteMovie={ deleteMovie }
                className="sortable-item"
                key={ `item-${ movie.id }` }
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
          transitionDuration={ 300 }
          lockAxis="y"
        />
      </div>
    );
  };
};

EditableList.propTypes = {
  items: PropTypes.array.isRequired,
  orderList: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  items: state.items,
});

const mapDispatchToProps = dispatch => ({
  orderList: ({ oldIndex, newIndex, movies }) => dispatch(orderList(oldIndex, newIndex, movies)),
  deleteMovie: movie => dispatch(deleteMovie(movie))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditableList);