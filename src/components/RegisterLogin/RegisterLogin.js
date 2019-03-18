import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Register from './Register/Register.js';
import LogIn from './LogIn/LogIn.js';

class RegisterLogin extends Component {
  
  state = {
    authError: '',
  }

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
          {this.state.authError && this.renderError()}
          <Tabs defaultActiveKey="login">
            <Tab eventKey="login" title="Log In">
              <LogIn />
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