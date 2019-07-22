import React, { PureComponent } from 'react';
import LoginBox from '../LoginBox/LoginBox';
import { Container, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Login.css';

class Login extends PureComponent {
  render() {
    return (
      <Container className="container d-flex border-0 justify-content-center">
        <Col className="inner-container mt-4 mx-4 p-0">
          <Col className="bg-white1 pt-2">
            <LoginBox />
          </Col>
        </Col>
      </Container>
    )
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Login);
