import React from 'react';
import PropTypes from 'prop-types';
import SortableList from './SortableList';
import ViewableList from './ViewableList';
import SaveDelete from '../SaveDelete';
import Search from '../Search';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';

const List = withLoading(({ isEditing, items, username, user }) => {
  if (isEditing) {
    return (
      <div>
        <div className="search-btns-container">
          <SaveDelete />
        </div>
        <Search itemsCount={ items.length }/>
        <SortableList />
      </div>
    )
  } else {
    return (
      <div>
        <div className="d-flex justify-content-end">
          {
            user.username === username && <EditButton />
          }
        </div>
        <ViewableList
          items={ items }
        />
      </div>
    )
  }
});

List.propTypes = {
  user: PropTypes.object,
  username: PropTypes.string,
  items: PropTypes.array,
  isEditing: PropTypes.bool.isRequired,
};

export default List;