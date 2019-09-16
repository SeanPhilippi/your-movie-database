import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Comment = ({ comment }) => (
  <div className="border my-1 px-2 py-1">
    <div>
      <Link to={`/profile/${ comment.author }`}>{ comment.author }</Link> wrote on { comment.post_date }
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