import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Emojione } from 'react-emoji-render';

const Comment = ({
  user,
  comment: {
    author,
    post_date,
    text
  },
  deleteComment
}) => (
  <div className="border my-1 px-2 py-1 d-flex flex-column">
    <div>
      {/* eslint-disable-next-line */}
      <Link to={`/profile${ author === user.username ? '' : `/${ author }`}`}>{ author }</Link> wrote on { post_date }
    </div>
    <Emojione className="comment" text={`${ text }`} />
    <div
      className="comment-footer text-right small"
      onClick={ deleteComment }
    >
      delete
    </div>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    author: PropTypes.string.isRequired,
    post_date: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Comment);