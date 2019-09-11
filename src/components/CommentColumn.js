import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class CommentColumn extends PureComponent {

  comments = [
    {
      username: 'daniel glassman',
      text: 'wassup buddy',
      post_date: Date.now(),
      list_id: '5d3509473d393ebfa132e80b'
    }
  ]

  onComment = () => {
    this.renderComments();
  }

  // ! find a differnt way to do this.  don't call this in the return!
  renderComments = () => (
    <div>
      {
        this.comments.map(comment =>
          <div className="border">
            <div>
              <NavLink to={`/profile/${ comment.username }`}>{ comment.username }</NavLink> wrote on { comment.post_date }
            </div>
            <p className="comment">
              { comment.text }
            </p>
          </div>
        )
      }
    </div>
  )

  render() {
    return (
      <div className="d-flex flex-column p-2">
        <div className="pb-1 font-weight-bold text-left">
          Write a comment
        </div>
        <textarea
          className="comments-box w-100"
          type="text"
          name="comments"
          rows="4"
        >
        </textarea>
        <button
          onClick={ this.onComment }
          className="send mt-3"
        >
          Send
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  comments: state.comments,
});

export default connect(mapStateToProps)(CommentColumn);
