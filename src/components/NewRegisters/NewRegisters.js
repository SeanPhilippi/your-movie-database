import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './NewRegisters.css';

class NewRegisters extends PureComponent {
  render() {
    const {
      newUsers,
    } = this.props;

    return (
      <Row className="login-box d-flex flex-column bg-white1">
        <div>
          <div className="py-2 px-4 bg-white1">
            <div className="mb-2">
              Most recently registered users on YMDb:
            </div>
            <div className="text-orange">
              {
                newUsers.map(({ _id, username, register_date }) => {
                  return (
                    <div
                      className="d-flex justify-content-between"
                      key={_id}
                    >
                      <div>
                        {username}
                      </div>
                      <div>
                        {register_date}
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <hr/>
            <p>
              <NavLink to="/new-users">
                Go to the list of the last 50 users
              </NavLink>
            </p>
          </div>
        </div>
      </Row>
    )
  }
}

NewRegisters.propTypes = {
  newUsers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  newUsers: state.newUsers
});

export default connect(mapStateToProps)(NewRegisters);
