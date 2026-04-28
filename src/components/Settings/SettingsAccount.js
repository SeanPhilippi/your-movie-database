import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logoutUser } from '../../redux/actions';

const SettingsAccount = ({ user, logoutUser, history }) => {
  const handleLogout = event => {
    event.preventDefault();
    logoutUser(history);
  };

  return (
    <div className='settings-account'>
      <div className='settings-account-row'>
        <span className='settings-account-label'>Username</span>
        <span className='settings-account-value'>{user.username}</span>
      </div>
      <div className='settings-account-row'>
        <span className='settings-account-label'>Email</span>
        <span className='settings-account-value'>{user.email}</span>
      </div>
      <div className='settings-account-row'>
        <span className='settings-account-label'>Password</span>
        <Link to='/forgot-password'>Send reset email</Link>
      </div>
      <div className='settings-account-row'>
        <span className='settings-account-label'>Change email</span>
        <span className='settings-account-coming-soon'>coming soon</span>
      </div>
      <div className='settings-account-logout'>
        <button className='log-out-btn' onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: history => dispatch(logoutUser(history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsAccount));
