import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteList, setUpdateStatus } from '../../redux/actions';
import './SaveDelete.css';

class SaveDelete extends PureComponent {
  handleUpdate = () => {
    const {
      setUpdateStatus,
      user: {
        username,
      },
      list,
      statement
    } = this.props;

    const listObj = {
      username,
      list: [...list],
      statement
    }
    console.log('list obj in handleUpdate', listObj)
    setUpdateStatus();
    console.log('username in handleUpdate', username);

    fetch(`/api/movies/save/${ username }`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(listObj)
      })
      .then(res => res.json())
      .catch(console.log);
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
    // clearing redux list array
    deleteList();
    // deleting list mlab document tied to user

    return fetch(`/delete/${username}`, {
      method: 'DELETE'
    })
    .catch(console.error)
  };

  render() {
    return (
      <div className="save-delete d-flex">
        <button
          className="save-list"
          onClick={this.handleUpdate}
        >
          SAVE
        </button>
        <button
          className="delete-list"
          onClick={this.handleDelete}
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
  list: PropTypes.array.isRequired,
  statement: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  list: state.list,
  statement: state.statement
});

const mapDispatchToProps = dispatch => ({
  deleteList: () => dispatch(deleteList()),
  setUpdateStatus: () => dispatch(setUpdateStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveDelete);
