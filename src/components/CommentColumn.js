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
    comment: {},
    loading: true
  }

  handleFieldChange = e => {
    const { value } = e.target;
    const newComment = {
      username: this.props.user.username,
      post_date: moment().format('LL'),
      text: value
    };
    this.setState({
      comment: newComment
    });
  }


  handleComment = e => {
    const { user: { username }, match, postComment, comments } = this.props;
    const { comment } = this.state;
    e.preventDefault();
    postComment(comment, username, match.params.username || username, comments);
    this.renderComments();
    this.commentTextArea.value = '';
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  // ! find a differnt way to do this.  don't call this in the return!
  renderComments = () => (
    <div>
      {
        this.props.comments.map(comment => <Comment key={ comment._id } comment={ comment } />)
      }
    </div>
  )

  render() {
    if (this.state.loading) return <Spinner />;

    return (
      <div className="d-flex flex-column p-2">
        {
          this.props.isAuthenticated
          ? <React.Fragment>
              <div className="pb-1 font-weight-bold text-left">
                Write a comment
              </div>
              <textarea
                ref={ ref => this.commentTextArea = ref }
                className="comments-box w-100"
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
        { this.props.loading ? <Spinner /> : this.renderComments() }
      </div>
    )
  }
}

CommentColumn.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapDispatchToProps = dispatch => ({
  postComment: (comment, author, username, comments) => dispatch(postComment(comment, author, username, comments)),
});

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  comments: state.comments
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentColumn));
