import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Comment = ({ comment }) => (
  <div className="border my-1 px-2 py-1">
    <div>
      <NavLink to={`/profile/${ comment.username }`}>{ comment.username }</NavLink> wrote on { comment.post_date }
    </div>
    <p className="comment">
      { comment.text }
    </p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;