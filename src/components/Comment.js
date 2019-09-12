import React from "react";
import { NavLink } from 'react-router-dom';

const Comment = ({ comment }) => (
  <div className="border my-1 px-2 py-1">
    <div>
      <NavLink to={`/profile/${ comment.author }`}>{ comment.author }</NavLink> wrote on { comment.post_date }
    </div>
    <p className="comment">
      { comment.text }
    </p>
  </div>
);

export default Comment;