import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NewRegistersBox extends PureComponent {
  render() {
    const {
      newUsers,
    } = this.props;

    return (
      <Row className="login-box d-flex flex-column">
        <div>
          <div className="py-2 px-4">
            <div className="mb-2">
              Most recently registered users on YMDb:
            </div>
            <div className="text-orange">
              {
                newUsers.map(({ _id, username, register_date }) => {
                  return (
                    <div
                      className="d-flex justify-content-between"
                      key={ _id }
                    >
                      <div>
                        <Link to={`/profile/${ username }`}>
                          { username }
                        </Link>
                      </div>
                      <div>
                        { register_date }
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <hr/>
            <p>
              <Link to="/new-users">
                Go to the list of the last 50 users
              </Link>
            </p>
          </div>
        </div>
      </Row>
    )
  }
}

NewRegistersBox.propTypes = {
  newUsers: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  newUsers: state.newUsers
});

export default connect(mapStateToProps)(NewRegistersBox);
