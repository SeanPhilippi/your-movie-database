import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';
import { orderList, deleteMovie } from '../../../redux/actions';

class EditableList extends PureComponent {
  render() {
    const { items, orderList, deleteMovie } = this.props;

    const SortableList = sortableContainer(({ items }) => (
      <div>
        {items.map((movie, index) => {
          return (
            <SortableItem
              deleteMovie={deleteMovie}
              className='sortable-item'
              key={`item-${movie.id}`}
              sortIndex={index}
              index={index}
              movie={movie}
            />
          );
        })}
      </div>
    ));

    return (
      <div className='list-container'>
        <SortableList
          helperClass='sortable-helper'
          items={items}
          useDragHandle
          onSortEnd={orderList}
          transitionDuration={300}
          lockAxis='y'
        />
      </div>
    );
  }
}

EditableList.propTypes = {
  orderList: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  orderList: ({ oldIndex, newIndex }) =>
    dispatch(orderList(oldIndex, newIndex)),
  deleteMovie: movie => dispatch(deleteMovie(movie)),
});

export default connect(null, mapDispatchToProps)(EditableList);
