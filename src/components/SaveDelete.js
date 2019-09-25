import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  deleteList,
  setUpdateStatus,
  setEditing
} from '../redux/actions';

class SaveDelete extends PureComponent {
  handleUpdate = () => {
    const {
      setUpdateStatus,
      setEditing,
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
    setEditing(false);

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
              this.handleDelete();
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

  handleDelete = () => {
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
          { this.props.items.length } / 20
        </div>
        <div>
          <Link to={`/profile/${ this.props.user.username }`}>
            <button
              className="save-list"
              onClick={ this.handleUpdate }
            >
                SAVE
            </button>
          </Link>
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
  setUpdateStatus: PropTypes.func.isRequired,
  setEditing: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  statement: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  items: state.items,
  statement: state.statement,
  isEditing: state.isEditing,
});

const mapDispatchToProps = dispatch => ({
  deleteList: () => dispatch(deleteList()),
  setUpdateStatus: () => dispatch(setUpdateStatus()),
  setEditing: bool => dispatch(setEditing(bool)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveDelete);
