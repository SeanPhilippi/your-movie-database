import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NewRegistersBox extends PureComponent {
  render() {
    const {
      newUsers,
      num,
      registerPage
    } = this.props;

    return (
      <Row className="login-box d-flex flex-column">
        <div>
          <div className="py-2 px-4">
            <div className="mb-2">
              {
                !registerPage
                ? 'Most recent registered users on YMDb:'
                : <span>
                    Last { newUsers.length > 50 ? 50 : newUsers.length } registered users on
                    YMDB out of { newUsers.length }.<br/>
                    You can search for a user on the <Link to='/users-index'>User's Index Page</Link>.
                  </span>
              }
            </div>
            <div>
              {
                newUsers.slice(0, num).map(({ _id, username, register_date }) => {
                  return (
                    <div
                      className="d-flex justify-content-between"
                      key={ _id }
                    >
                      <div className="text-orange">
                        <Link to={`/profile/${ username }`}>
                          { username }
                        </Link>
                      </div>
                      <div className="text-black">
                        { register_date }
                      </div>
                    </div>
                  )
                })
              }
            </div>
            {
              !this.props.registerPage &&
                <div>
                  <hr/>
                  <span>
                    <Link to="/new-registers">
                      Go to list of the last 50 users
                    </Link>
                  </span>
                </div>
            }
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
