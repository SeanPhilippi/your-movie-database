import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'reactstrap';
import CardWrapper from './HOCs/CardWrapper';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions';

const Account = ({ history, user, logoutUser }) => {
  const handleLogout = e => {
    e.preventDefault();
    logoutUser(history);
  };

  return (
    <div className='d-flex border-0 justify-content-center w-100' style={{ flex: '1 1' }}>
      <Col className='inner-container'>
        <Col className='bg-white pt-2'>
          <CardWrapper
            icon={['far', 'user-circle']}
            title='my account'
            color='tan'
          >
            <div className='d-flex justify-content-between'>
              <p>You are logged in as {user.username}</p>
              <button className='log-out-btn' onClick={handleLogout}>
                Log out
              </button>
            </div>
          </CardWrapper>
        </Col>
      </Col>
    </div>
  );
}

Account.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    statement: PropTypes.string,
    items: PropTypes.array,
  }),
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: history => dispatch(logoutUser(history)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);