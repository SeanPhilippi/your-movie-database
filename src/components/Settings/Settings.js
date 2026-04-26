import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SettingsNotifications from './SettingsNotifications';

const Settings = ({ isAuthenticated }) => {
  if (!isAuthenticated) return <Redirect to='/login' />;

  return (
    <div className='settings-page' style={{ flex: 1 }}>
      <div className='settings-container'>
        <h2 className='settings-title'>Account Settings</h2>
        <SettingsNotifications />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Settings);
