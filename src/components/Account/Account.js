import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import CardWrapper from '../CardWrapper/CardWrapper';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logoutUser } from '../../redux/actions';

class Account extends PureComponent {

  handleLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <div className="d-flex border-0 justify-content-center">
        <Col className="inner-container mt-4 mx-4 p-0">
          <Col className="white pt-2">
            <CardWrapper title="My Account" color="tan">
              <div className="d-flex justify-content-between">
                <p>
                  You are logged in as { this.props.user.username }
                </p>
                <button
                  className="log-out-btn"
                  onClick={ this.handleLogout }
                >
                  Log out
                </button>
              </div>
            </CardWrapper>
          </Col>
        </Col>
      </div>
    )
  }
}

Account.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: history => dispatch(logoutUser(history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
