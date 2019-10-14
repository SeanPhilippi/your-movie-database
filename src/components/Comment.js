import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Comment = ({ comment: { author, post_date, text } }) => (
  <div className="border my-1 px-2 py-1">
    <div>
      {/* eslint-disable-next-line */}
      <Link to={`/profile/${ author }`}>{ author }</Link> wrote on { post_date }
    </div>
    <p className="comment">
      { text }
    </p>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    post_date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

export default Comment;