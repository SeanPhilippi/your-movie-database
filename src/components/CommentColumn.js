import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Comment from './Comment';
import moment from 'moment';

class CommentColumn extends PureComponent {

  state = {
    comments: [
      {
        username: 'daniel glassman',
        text: 'wassup buddy',
        post_date: 'September 2 2019',
      }
    ],
    comment: {}
  }

  handleFieldChange = e => {
    const { value } = e.target;
    const newComment = {
      username: this.props.user.username,
      post_date: moment().format('LL'),
      text: value
    };
    this.setState({
      ...this.state,
      comment: newComment
    });
    console.log('new comment', newComment)
  }

  // clearTextField = () => {
  //   this.setState({
  //     ...this.state,
  //     comment: [],
  //   });
  // }

  handleComment = e => {
    const { user: { username }, match } = this.props;
    const { comments, comment } = this.state;
    e.preventDefault();
    this.setState({
      ...this.state,
      comments: [
        comment,
        ...comments
      ]
    });
    console.log('rendering')
    fetch(`/api/comments/${ username }/${ match.params.username || username }`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(comments)
      }
    )
      .then(res => res.json)
      .catch(console.log);
    this.renderComments();
    // this.clearTextField();
  }

  // ! find a differnt way to do this.  don't call this in the return!
  renderComments = () => (
    <div>
      {
        this.state.comments.map(comment => <Comment comment={ comment } />)
      }
    </div>
  )

  render() {

    return (
      <div className="d-flex flex-column p-2">
        {
          this.props.isAuthenticated
          ? <React.Fragment>
              <div className="pb-1 font-weight-bold text-left">
                Write a comment
              </div>
              <textarea
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
              Create an account <NavLink to="/register">here</NavLink> or <NavLink to="/login">log in</NavLink> to make a comment.
            </div>
        }
        { this.renderComments() }
      </div>
    )
  }
}

CommentColumn.propTypes = {
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated
});

export default withRouter(connect(mapStateToProps)(CommentColumn));
