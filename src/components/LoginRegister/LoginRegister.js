import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Row, Col, Alert } from 'react-bootstrap';
import Register from './Register/Register.js';
import LogIn from './LogIn/LogIn.js';

class LoginRegister extends Component {
  
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

LoginRegister.propTypes = {
  authError: PropTypes.string,
};

export default LoginRegister;