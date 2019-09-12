import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Comment from './Comment';
import moment from 'moment';

class CommentColumn extends PureComponent {

  state = {
    comments: [
      {
        author: 'daniel glassman',
        text: 'wassup buddy',
        post_date: 'September 9, 2019',
        username: 'kesto'
      }
    ],
    comment: {}
  }

  handleFieldChange = e => {
    const { value } = e.target;
    const newComment = {
      author: this.props.user.username,
      post_date: moment().format('LL'),
      username: this.props.match.params.username || this.props.user.username,
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
    console.log('comment')
    e.preventDefault();
    this.setState({
      ...this.state,
      comments: [
        this.state.comment,
        ...this.state.comments
      ]
    })
    console.log('rendering')
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
          && <React.Fragment>
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
