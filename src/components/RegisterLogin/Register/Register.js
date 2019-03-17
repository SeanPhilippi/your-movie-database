import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Register extends Component {

  state = {
    username: '',
    password: '',
    confirmPassword: '',
  }

  handlleSubmit(e) {
    e.preventDefault();

  }

  render() {
    return (
      <div className="register">
        <form style={{width: '65%', flex: 1, margin: '2rem auto'}}>
          {this.props.error && this.renderError()}
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="email"
              name="username"
              // onChange={}
              placeholder="Enter Username"
              value={this.state.username}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
            />              
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
            />              
          </Form.Group>

          <Button type="submit">
            Register
          </Button>
        </form>
      </div>
    )
  }
}

// Register.propTypes = {
//   onRegister: PropTypes.func.isRequired,
// }

export default Register;