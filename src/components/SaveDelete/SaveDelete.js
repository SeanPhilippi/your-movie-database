import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { deleteList, setUpdateStatus } from '../../redux/actions';

import './SaveDelete.css';

class SaveDelete extends PureComponent {

  handleUpdate = () => {
    this.props.setUpdateStatus();
    fetch(`/api/movies/save/${this.props.state.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.props.state)
    })
    .then(res => res.json())
    .catch(err => console.log(err));
  }

  alertOptions = {
    title: 'Are you sure?',
    message: 'You are about to permanently delete your list.',
    customUI: ({ onClose, title, message }) => {
      return (
        <div className='custom-ui'>
          <h2>{title}</h2>
          <p>{message}</p>
          <button className='alert-button red' onClick={onClose}>No</button>
          <button className='alert-button green' onClick={() => {
            this.performDelete();
            onClose();
            }}>
            Yes, delete it!
          </button>
        </div>
      )
    },
    PureUnmount: () => {},
    onClickOutside: () => {},
    onKeypressEscape: () => {}
  }

  handleDelete = () => {
    confirmAlert(this.alertOptions);
  }

  performDelete = () => {
    // clearing redux list array
    this.props.deleteList();
    // deleting list mlab document tied to user
    const { username } = this.props.user;
    return fetch(`/delete/${username}`, {
      method: 'DELETE'
    })
    .catch(err => console.error(err))
  }

  render() {

    return (
      <div className="save-delete d-flex">
        <button
          className="save-list"
          onClick={() => this.handleUpdate()}
        >
          SAVE
        </button>
        <button
          className="delete-list"
          onClick={() => this.handleDelete()}
        >
          DELETE LIST
        </button>
      </div>
    )
  }
}

SaveDelete.propTypes = {
  deleteList: PropTypes.func.isRequired,
  setUpdateStatus: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { deleteList, setUpdateStatus })(SaveDelete);