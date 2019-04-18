import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SaveDelete.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import { deleteList, setUpdateStatus } from '../../redux/actions';

class SaveDelete extends Component {

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
    willUnmount: () => {},
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
    const {username} = this.props.state;
    return fetch(`/delete/${username}`, {
      method: 'DELETE'
    })
    .catch(err => console.error(err))
  }

  render() {

    return (
      <div className="save-delete">
        <button 
          className="delete-list"
          onClick={() => this.handleDelete()}
        >
          DELETE LIST
        </button>
        <button
          className="save-list"
          onClick={() => this.handleUpdate()}
        >
          SAVE
        </button>
      </div>
    )
  }
}

// SaveDelete.propTypes = {
//   state: PropTypes.object.isRequired,
//   deleteList: PropTypes.func.isRequired,
//   setUpdateStatus: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
// }

const mapStateToProps = state => ({
  state: state
});

const mapDispatchToProps = dispatch => ({
  deleteList: () => dispatch(deleteList()),
  setUpdateStatus: () => dispatch(setUpdateStatus())
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveDelete);