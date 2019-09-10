import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteList, setUpdateStatus, setEditing } from '../redux/actions';

class SaveDelete extends PureComponent {
  handleUpdate = () => {
    const {
      setUpdateStatus,
      user: {
        username,
      },
      items,
      statement
    } = this.props;

    const listObj = {
      username,
      items: [...items],
      statement
    }
    setUpdateStatus();

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
    console.log('in save', this.props.user.username)
    return (
      <div className="save-delete d-flex justify-content-between">
        <div className="count">
          { this.props.items.length } / 20
        </div>
        <div>
          <button
            className="save-list"
            onClick={this.handleUpdate}
          >
            <NavLink className="link" to={`/profile/${ this.props.user.username }`}>
              SAVE
            </NavLink>
          </button>
          <button
            className="delete-list"
            onClick={this.handleDelete}
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
  setUpdateStatus: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  statement: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  items: state.items,
  statement: state.statement,
});

const mapDispatchToProps = dispatch => ({
  deleteList: () => dispatch(deleteList()),
  setUpdateStatus: () => dispatch(setUpdateStatus()),
  setEditing: () => dispatch(setEditing()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveDelete);
