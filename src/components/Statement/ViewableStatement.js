import React from 'react';
import PropTypes from 'prop-types';

const ViewableStatement = ({ username, statement }) => (
  <div>
    <p className='font-weight-bold'>{username}:</p>
    <div className='statement-box'>
      <p className='textarea'>{statement}</p>
    </div>
  </div>
);

ViewableStatement.propTypes = {
  username: PropTypes.string.isRequired,
  statement: PropTypes.string,
};

export default ViewableStatement;
