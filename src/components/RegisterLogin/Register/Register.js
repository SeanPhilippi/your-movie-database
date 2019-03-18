import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Register extends Component {

  state = {
    email: '',
    username: '',
    password: '',
    password2: '',
  }

  handlleSubmit(e) {
    e.preventDefault();

  }

  render() {
    return (
      <div className="register">
        <form style={{width: '65%', flex: 1, margin: '3rem auto'}}>
          {this.props.error && this.renderError()}
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              // onChange={}
              placeholder="Enter Email"
              value={this.state.email}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
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
              name="password2"
              placeholder="Confirm Password"
              value={this.state.password2}
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