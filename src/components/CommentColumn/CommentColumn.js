import React from 'react';

import './CommentColumn.css';

class CommentColumn extends React.Component {

  render() {

    return (
      <div className="mx-4">
        <div className="bg-red comments-label">Comments</div>
        <div className="comments-container bg-white d-flex flex-column p-2">
          <div className="p-4 text-left">Write a comment</div>
          <textarea
            className="comments"
            type="text"
            name="comments"
          >
          </textarea>
          <button className="send mt-1">Send</button>
        </div>
      </div>
    )
  }
}

export default CommentColumn;