import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Comment = ({ comment: { author, post_date, text } }) => (
  <div className="border my-1 px-2 py-1">
    <div>
      <Link to={`/profile/${ author }`}>{ author }</Link> wrote on { post_date }
    </div>
    <p className="comment">
      { text }
    </p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;