import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withRouter,
  Link
} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import Comment from './Comment';
import Spinner from './Spinner';
import moment from 'moment';
import { postComment } from '../redux/actions';

class Comments extends PureComponent {

  state = {
    commentText: ''
  };

  handleFieldChange = e => {
    this.setState({ commentText: e.target.value });
  };

  handleComment = e => {
    const {
      postComment,
      user: {
        username
      },
      match,
      history,
      location
    } = this.props;
    const {
      commentText
    } = this.state;
    e.preventDefault();
    let newComment;
    if (commentText.length && history.location.pathname.includes('/profile')) {
      newComment = {
        username: match.params.username || username,
        author: username,
        post_date: moment().format('LL'),
        text: commentText
      };
    };
    if (commentText.length && history.location.pathname.includes('/movies')) {
      newComment = {
        movie_id: location.state.movie.id,
        author: username,
        post_date: moment().format('LL'),
        text: commentText
      };
    };
    if (commentText.length && history.location.pathname.includes('/top-movies')) {
      newComment = {
        top_movies_list: true,
        author: username,
        post_date: moment().format('LL'),
        text: commentText
      };
    };
    postComment(newComment);
    this.setState({ commentText: '' });
  };

  alertOptions = {
    title: 'Are you sure?',
    message: 'You are about to permanently delete this comment.',
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

  handleDeleteComment = e => {
    confirmAlert(this.alertOptions);
  };

  performDelete = () => {
    const {
      deleteComment,
      user: {
        username,
      },
    } = this.props;
    deleteComment();
    return fetch(`/delete/${ username }`, {
      method: 'DELETE'
    })
    .catch(console.error)
  };

  renderComments = () => {
    return (
      <div>
        {
          this.props.comments.map(comment => <Comment key={ comment._id } comment={ comment } deleteComment={ this.handleDeleteComment }/>)
        }
      </div>
    );
  };

  render() {
    const { commentText } = this.state;
    const {
      isAuthenticated,
      loading
    } = this.props;

    return (
      <div className="d-flex flex-column p-2">
        {
          isAuthenticated
          ? <>
              <div className="pb-1 font-weight-bold text-left">
                Write a comment
              </div>
              <textarea
                className="comments-box w-100"
                value={ commentText }
                type="text"
                name="comments"
                rows="4"
                onChange={ this.handleFieldChange }
              >
              </textarea>
              <button
                onClick={ this.handleComment }
                className="send mt-3"
              >
                Send
              </button>
            </>
          : <div className="ml-1 mb-1">
              Create an account <Link to="/register">here</Link> or <Link to="/login">log in</Link> to make a comment.
            </div>
        }
        { loading ? <Spinner /> : this.renderComments() }
      </div>
    )
  }
};

Comments.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string
  }),
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  postComment: comment => dispatch(postComment(comment)),
});

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments));