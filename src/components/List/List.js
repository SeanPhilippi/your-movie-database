import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import EditableList from './EditableList/EditableList';
import ViewableList from './ViewableList/ViewableList';
import SaveDelete from '../SaveDelete';
import Search from '../Search';
import EditButton from './EditButton';
import withLoading from '../HOCs/withLoading';

const List = withLoading(
  ({
    isEditing,
    items,
    history: {
      location: { pathname },
    },
    user: { items: authItems },
  }) => {
    if (isEditing && pathname === '/profile') {
      return (
        <div>
          <div className='search-btns-container'>
            <SaveDelete />
          </div>
          <Search itemsCount={authItems.length} />
          <EditableList items={authItems} />
        </div>
      );
    } else {
      return (
        <div>
          <div className='d-flex justify-content-end'>
            {/* <div className="blurb">
            this is my blurb
          </div> */}
            {pathname === '/profile' && <EditButton />}
          </div>
          <ViewableList items={pathname === '/profile' ? authItems : items} />
        </div>
      );
    }
  }
);

List.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    statement: PropTypes.string,
    items: PropTypes.array,
  }).isRequired,
  username: PropTypes.string,
  items: PropTypes.array,
  isEditing: PropTypes.bool.isRequired,
};

export default withRouter(List);
