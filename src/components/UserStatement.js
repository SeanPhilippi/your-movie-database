import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class UserStatement extends PureComponent {

  noStatement = () => <div>This user hasn't added a statement yet.</div>;

  render() {
    const { username, statement } = this.props;

    return (
      <div>
        <p className="font-weight-bold">
          { username }:
        </p>
        <p className="textarea">
          { statement }
        </p>
      </div>
    )
  }
}

UserStatement.propTypes = {
  username: PropTypes.string.isRequired,
  statement: PropTypes.string,
};

export default UserStatement;
