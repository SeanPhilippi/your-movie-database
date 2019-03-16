import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import TopNav from '../TopNav/TopNav';
import { Form, Button } from 'react-bootstrap';

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
        {/* <TopNav /> */}
        <form style={{width: '50%', flex: 1, margin: '0 auto'}}>
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