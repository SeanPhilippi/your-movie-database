import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
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
      <Row>
        <Col>
          {this.state.authError && this.renderError()}
          <Tabs>
            <Tab>
              <Register />
            </Tab>
            <Tab>
              <LogIn />
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