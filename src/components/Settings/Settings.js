import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col } from 'reactstrap';
import CardWrapper from '../HOCs/CardWrapper';
import SettingsAccount from './SettingsAccount';
import SettingsNotifications from './SettingsNotifications';
import SettingsProfile from './SettingsProfile';

const Settings = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <div className='d-flex border-0 justify-content-center w-100' style={{ flex: 1 }}>
      <Col className='inner-container'>
        <Col className='bg-white pt-2'>
          <CardWrapper icon={['far', 'user-circle']} title='my account' color='tan'>
            <SettingsAccount />
          </CardWrapper>
          <CardWrapper icon='bell' title='notification settings' color='tan'>
            <SettingsNotifications />
          </CardWrapper>
          <CardWrapper icon={['far', 'user-circle']} title='profile visibility' color='tan'>
            <SettingsProfile />
          </CardWrapper>
        </Col>
      </Col>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Settings);
