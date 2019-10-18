import React from 'react';
import PropTypes from 'prop-types';
import EditableList from './EditableList/EditableList';
import ViewableList from './ViewableList/ViewableList';
import SaveDelete from '../SaveDelete';
import Search from '../Search';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';

const List = withLoading(({ isEditing, items, username, user }) => {
  if (isEditing && user.username === username) {
    return (
      <div>
        <div className="search-btns-container">
          <SaveDelete />
        </div>
        <Search itemsCount={ items.length }/>
        <EditableList />
      </div>
    )
  } else {
    return (
      <div>
        <div className="d-flex justify-content-end">
          {/* <div className="blurb">
            this is my blurb
          </div> */}
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
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  username: PropTypes.string,
  items: PropTypes.array,
  isEditing: PropTypes.bool.isRequired,
};

export default List;