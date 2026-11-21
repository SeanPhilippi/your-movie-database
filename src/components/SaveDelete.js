import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteList, clearDeletedMovies, saveUserList } from '../redux/actions';

class SaveDelete extends PureComponent {
  alertOptions = {
    title: 'Are you sure?',
    message: 'You are about to permanently delete your list.',
    customUI: ({ onClose, title, message }) => (
      <div className='confirm-modal bg-white shadow'>
        <h2 className='mb-3'>{title}</h2>
        <p className='mb-4'>{message}</p>
        <button className='cancel-button' onClick={onClose}>
          No
        </button>
        <button
          className='confirm-button'
          onClick={() => {
            this.performDelete();
            onClose();
          }}
        >
          Yes, delete it!
        </button>
      </div>
    ),
    PureUnmount: () => {},
    onClickOutside: () => {},
    onKeypressEscape: () => {},
  };

  handleDelete = () => {
    confirmAlert(this.alertOptions);
  };

  performDelete = async () => {
    const {
      deleteList,
      clearDeletedMovies,
      user: { username, items },
      deletedMovies,
      addedMovies,
    } = this.props;
    try {
      // delete on the backend first, so the stats recompute below reflects
      // this user's vote actually being gone, not the stale pre-delete list
      await fetch(`/api/list/delete/${username}`, { method: 'DELETE' });
      const affectedMovies = [...items, ...deletedMovies, ...addedMovies].filter(
        (movie, idx, all) => all.findIndex(m => m.id === movie.id) === idx
      );
      deleteList(affectedMovies);
      if (deletedMovies.length) {
        clearDeletedMovies();
      }
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    return (
      <div className='save-delete d-flex justify-content-between'>
        <div className='count'>{this.props.user.items.length} / 20</div>
        <div>
          <button onClick={this.props.saveUserList} className='save-list'>
            SAVE
          </button>
          <button className='delete-list' onClick={this.handleDelete}>
            DELETE LIST
          </button>
        </div>
      </div>
    );
  }
}

SaveDelete.propTypes = {
  deleteList: PropTypes.func.isRequired,
  clearDeletedMovies: PropTypes.func.isRequired,
  saveUserList: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    statement: PropTypes.string,
    items: PropTypes.array,
  }).isRequired,
  deletedMovies: PropTypes.array.isRequired,
  addedMovies: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  deletedMovies: state.deletedMovies,
  addedMovies: state.addedMovies,
});

const mapDispatchToProps = dispatch => ({
  deleteList: movies => dispatch(deleteList(movies)),
  clearDeletedMovies: () => dispatch(clearDeletedMovies()),
  saveUserList: () => dispatch(saveUserList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveDelete);
