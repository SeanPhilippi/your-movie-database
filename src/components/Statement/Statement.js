import React from 'react';
import PropTypes from 'prop-types';
import EditableStatement from './EditableStatement';
import ViewableStatement from './ViewableStatement';
import withLoading from '../HOCs/withLoading';

const Statement = withLoading(({ user, username, statement, isEditing }) => isEditing && user.username === username
  ? <EditableStatement />
  : <ViewableStatement
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