import React from 'react';
import PropTypes from 'prop-types';

const UserStatement = ({ username, statement }) => (
  <div>
    <p className="font-weight-bold">
      { username }:
    </p>
    <p className="textarea">
      { statement }
    </p>
  </div>
)


UserStatement.propTypes = {
  username: PropTypes.string.isRequired,
  statement: PropTypes.string,
};

export default UserStatement;
