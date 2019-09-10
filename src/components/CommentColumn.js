import React, { PureComponent } from 'react';

export default class CommentColumn extends PureComponent {
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
        <button className="send mt-3">
          Send
        </button>
      </div>
    )
  }
}
