import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Comment from './Comment';
import Spinner from './Spinner';
import moment from 'moment';
import { postComment } from '../redux/actions';

class CommentColumn extends PureComponent {

  state = {
    commentText: ''
  }

  handleFieldChange = e => {
    this.setState({ commentText: e.target.value });
  }


  handleComment = e => {
    const { postComment, user, match } = this.props;
    e.preventDefault();
    const newComment = {
      username: match.params.username || user.username,
      author: user.username,
      post_date: moment().format('LL'),
      text: this.state.commentText
    };
    postComment(newComment);
    this.setState({ commentText: '' });
  }

  renderComments = () => {
    if (this.props.match.path !== '/movies') {
      return (
        <div>
          {
            this.props.comments.map(comment => <Comment key={ comment._id } comment={ comment } />)
          }
        </div>
      )
    }
  }

  render() {
    const { commentText } = this.state;
    const { isAuthenticated, loading } = this.props;

    return (
      <div className="d-flex flex-column p-2">
        {
          isAuthenticated
          ? <React.Fragment>
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
            </React.Fragment>
          : <div className="ml-1 mb-1">
              Create an account <Link to="/register">here</Link> or <Link to="/login">log in</Link> to make a comment.
            </div>
        }
        { loading ? <Spinner /> : this.renderComments() }
      </div>
    )
  }
}

CommentColumn.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  postComment: comment => dispatch(postComment(comment)),
});

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentColumn));
