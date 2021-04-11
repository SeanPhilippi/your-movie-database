import React from 'react';
import LoginBox from './LoginBox';
import CardWrapper from './HOCs/CardWrapper';
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Login = () => (
  <div className='d-flex border-0 justify-content-center' style={{ flex: 1 }}>
    <div className='inner-container'>
      <Col className='bg-white pt-2'>
        <CardWrapper icon='sign-in-alt' title='Login' color='tan'>
          <LoginBox />
        </CardWrapper>
      </Col>
    </div>
  </div>
);

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Login);
