import React from 'react';
import PropTypes from 'prop-types';
import EditableStatement from './EditableStatement';
import UserStatement from './UserStatement';
import withLoading from '../HOCs/withLoading';

const Statement = withLoading(({ username, statement, isEditing }) => isEditing
  ? <EditableStatement />
  : <UserStatement
      username={ username }
      statement={ statement }
    />
);

Statement.propTypes = {
  username: PropTypes.string,
  statement: PropTypes.string,
  isEditing: PropTypes.bool.isRequired,
};

export default Statement;