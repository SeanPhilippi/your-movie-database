import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  deleteList,
  setMessageStatus,
  setEditing,
  setListData
} from '../redux/actions';

class SaveDelete extends PureComponent {
  handleUpdate = () => {
    const {
      setMessageStatus,
      setEditing,
      setListData,
      user: {
        username,
        statement,
        items
      },
      history
    } = this.props;

    const listObj = {
      username,
      items,
      statement
    };
    setListData(listObj);
    setMessageStatus('Profile Updated');
    setEditing(false);

    axios.put(`/api/list/save/${ username }`, listObj)
      .then(res => res.json())
      .catch(console.log);
    history.push('/profile');
  };

  alertOptions = {
    title: 'Are you sure?',
    message: 'You are about to permanently delete your list.',
    customUI: ({ onClose, title, message }) => {
      return (
        <div className='custom-ui'>
          <h2>
            { title }
          </h2>
          <p>
            { message }
          </p>
          <button
            className='alert-button red'
            onClick={onClose}
          >
            No
          </button>
          <button
            className='alert-button green'
            onClick={() => {
              this.performDelete();
              onClose();
            }}
          >
            Yes, delete it!
          </button>
        </div>
      )
    },
    PureUnmount: () => {},
    onClickOutside: () => {},
    onKeypressEscape: () => {}
  };

  handleDelete = () => {
    confirmAlert(this.alertOptions);
  };

  performDelete = () => {
    const {
      deleteList,
      user: {
        username,
      },
    } = this.props;
    deleteList();
    return fetch(`/delete/${ username }`, {
      method: 'DELETE'
    })
    .catch(console.error)
  };

  render() {
    return (
      <div className="save-delete d-flex justify-content-between">
        <div className="count">
          { this.props.user.items.length } / 20
        </div>
        <div>
          <button
            onClick={ this.handleUpdate }
            className="save-list"
          >
            SAVE
          </button>
          <button
            className="delete-list"
            onClick={ this.handleDelete }
          >
            DELETE LIST
          </button>
        </div>
      </div>
    )
  }
}

SaveDelete.propTypes = {
  deleteList: PropTypes.func.isRequired,
  setMessageStatus: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
  setListData: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  }).isRequired,
  statement: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  statement: state.statement,
  isEditing: state.isEditing,
});

const mapDispatchToProps = dispatch => ({
  deleteList: () => dispatch(deleteList()),
  setMessageStatus: message => dispatch(setMessageStatus(message)),
  setEditing: bool => dispatch(setEditing(bool)),
  setListData: listData => dispatch(setListData(listData)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SaveDelete));