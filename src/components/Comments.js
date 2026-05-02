import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comment from './Comment';
import moment from 'moment';
import { postComment, deleteComment } from '../redux/actions';
import { CommentsSkeleton } from './skeletons/ContentSkeletons';

class Comments extends PureComponent {
  state = {
    commentText: '',
    pickerOpen: false,
  };

  textareaRef = createRef();
  emojiWrapperRef = createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.emojiWrapperRef.current && !this.emojiWrapperRef.current.contains(event.target)) {
      this.setState({ pickerOpen: false });
    }
  };

  handleFieldChange = event => {
    this.setState({ commentText: event.target.value });
  };

  handleEmojiSelect = emoji => {
    const textarea = this.textareaRef.current;
    const { commentText } = this.state;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const updated = commentText.slice(0, start) + emoji.native + commentText.slice(end);
    this.setState({ commentText: updated, pickerOpen: false }, () => {
      textarea.focus();
      const pos = start + emoji.native.length;
      textarea.setSelectionRange(pos, pos);
    });
  };

  togglePicker = () => {
    this.setState(prev => ({ pickerOpen: !prev.pickerOpen }));
  };

  handleComment = event => {
    const {
      // prettier-ignore
      postComment,
      user: { username },
      match,
      history,
      location,
    } = this.props;
    const { commentText } = this.state;
    event.preventDefault();
    let newComment;

    if (commentText.length && history.location.pathname.includes('/profile')) {
      newComment = {
        username: match.params.username || username,
        author: username,
        post_date: moment().format('LL'),
        text: commentText,
      };
    }

    if (commentText.length && history.location.pathname.includes('/movies')) {
      newComment = {
        movie_id: location.state.movie.id,
        author: username,
        post_date: moment().format('LL'),
        text: commentText,
      };
    }

    if (
      commentText.length &&
      history.location.pathname.includes('/top-movies')
    ) {
      newComment = {
        top_movies_list: true,
        author: username,
        post_date: moment().format('LL'),
        text: commentText,
      };
    }
    postComment(newComment);
    this.setState({ commentText: '' });
  };

  handleDeleteComment = id => {
    confirmAlert({
      title: 'Are you sure?',
      message: 'You are about to permanently delete this comment.',
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
              this.performDelete(id);
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
    });
  };

  performDelete = id => {
    const { deleteComment } = this.props;
    deleteComment(id);
  };

  renderComments = () => {
    const { comments, user, match, history } = this.props;
    const profileOwner = history.location.pathname.includes('/profile')
      ? (match.params.username || user.username)
      : null;

    return (
      <div>
        {comments.map(comment => (
          <Comment
            key={comment._id}
            comment={comment}
            deleteComment={this.handleDeleteComment}
            profileOwner={profileOwner}
          />
        ))}
      </div>
    );
  };

  render() {
    const { commentText, pickerOpen } = this.state;
    const { isAuthenticated, commentsLoading, location } = this.props;

    if (commentsLoading) return <CommentsSkeleton />;

    return (
      <div className='d-flex flex-column p-2'>
        {isAuthenticated ? (
          <>
            <div className='pb-1 font-weight-bold text-left'>
              Write a comment
            </div>
            <textarea
              ref={this.textareaRef}
              className='comments-box w-100'
              value={commentText}
              type='text'
              name='comments'
              rows='4'
              onChange={this.handleFieldChange}
            />
            <div className='comment-toolbar'>
              <div className='emoji-picker-wrapper' ref={this.emojiWrapperRef}>
                <button
                  type='button'
                  className='emoji-trigger'
                  onClick={this.togglePicker}
                  onMouseDown={event => event.preventDefault()}
                  aria-label='Insert emoji'
                >
                  <FontAwesomeIcon icon={['far', 'face-smile']} />
                </button>
                {pickerOpen && (
                  <div className='emoji-picker-popover'>
                    <Picker
                      data={data}
                      set='native'
                      onEmojiSelect={this.handleEmojiSelect}
                      previewPosition='none'
                      skinTonePosition='none'
                      theme='light'
                    />
                  </div>
                )}
              </div>
              <button onClick={this.handleComment} className='send ml-auto'>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className='ml-1 mb-1'>
            Create an account <Link to='/register'>here</Link> or{' '}
            <Link to={{ pathname: '/login', state: { from: location.pathname } }}>log in</Link> to make a comment.
          </div>
        )}
        {this.renderComments()}
      </div>
    );
  }
}

Comments.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    statement: PropTypes.string,
    items: PropTypes.array,
  }),
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  postComment: comment => dispatch(postComment(comment)),
  deleteComment: id => dispatch(deleteComment(id)),
});

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  commentsLoading: state.commentsLoading,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Comments));
