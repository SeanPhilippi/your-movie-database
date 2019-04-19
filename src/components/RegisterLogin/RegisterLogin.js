import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Row, Col, Alert } from 'react-bootstrap';
import Register from './Register/Register';
import Login from './Login/Login';

class RegisterLogin extends PureComponent {

  renderError() {
    return (
      <Alert>
        <strong>{this.state.authError}</strong>
      </Alert>
    )
  }

  render() {
    return (
      <Row style={{margin: "3rem auto", width: '60rem'}}>
        <Col md={10} style={{margin: '0 auto'}}>
          <Tabs defaultActiveKey="login">
            <Tab eventKey="login" title="Log In">
              <Login />
            </Tab>
            <Tab eventKey="register" title="Register">
              <Register />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    )
  }
}

RegisterLogin.propTypes = {
  authError: PropTypes.string,
};

export default RegisterLogin;