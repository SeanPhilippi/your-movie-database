import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class UserStatement extends PureComponent {

  // componentDidUpdate(prevProps) {
  //   console.log('props in userstatement', prevProps, this.props)
  //   const { username } = this.props.match.params;
  //   console.log('params username in userstatement', username)
  //   if (prevProps.match.params.username !== username) {
  //     this.props.getListData(username);
  //   }
  // }

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

export default withRouter(UserStatement);
