import React from 'react';
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

export default Statement;