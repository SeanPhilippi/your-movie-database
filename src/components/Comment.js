import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const formatCommentDate = (createdAt, postDate) => {
  if (!createdAt) {
    return postDate;
  }
  const date = new Date(createdAt);
  const day = date.getUTCDate();
  const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const mins = String(date.getUTCMinutes()).padStart(2, '0');
  return `${day} ${month} ${year} ${hours}:${mins} GMT`;
};

const Comment = ({
  user,
  comment: {
    // prettier-ignore
    author,
    post_date,
    createdAt,
    text,
    _id,
  },
  deleteComment,
  profileOwner,
}) => (
  <div className='border my-1 px-2 py-1 d-flex flex-column'>
    <div>
      {/* eslint-disable-next-line */}
      <Link to={`/profile${author === user.username ? '' : `/${author}`}`}>
        {author}
      </Link>{' '}
      wrote on {formatCommentDate(createdAt, post_date)}
    </div>
    <p className='comment mt-2 mb-0'>{text}</p>
    {(author === user.username || (profileOwner && user.username === profileOwner)) ? (
      <div
        className='comment-footer-auth text-right small'
        onClick={() => deleteComment(_id)}
      >
        <span className='delete-comment'>delete</span>
      </div>
    ) : (
      <div className='comment-footer' />
    )}
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    post_date: PropTypes.string,
    createdAt: PropTypes.string,
    text: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Comment);
