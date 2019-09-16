import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Comment from './Comment';
import Spinner from './Spinner';
import moment from 'moment';
import axios from 'axios';

class CommentColumn extends PureComponent {

  state = {
    comment: {},
  }

  handleFieldChange = e => {
    const { value } = e.target;
    const { match, user } = this.props;
    const newComment = {
      username: match.params.username || user.username,
      author: user.username,
      post_date: moment().format('LL'),
      text: value
    };
    this.setState({
      comment: newComment
    });
  }


  handleComment = e => {
    const { postComment, user, match } = this.props;
    const { comment } = this.state;
    e.preventDefault();
    axios.post('/api/comments/', comment)
      .then(res => res.json)
      .then(() => {
        this.props.getComments(match.params.username || user.username);
      }).then(() => {
        this.renderComments();
      })
      .catch(console.log);
    this.commentTextArea.value = '';
  }

  // ! find a differnt way to do this.  don't call this in the return!
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

});

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentColumn));
