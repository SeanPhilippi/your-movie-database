import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import TopNav from '../TopNav/TopNav';

class LogIn extends Component {

  state = {
    username: '',
    password: '',
  }

  handlleSubmit(e) {
    e.preventDefault();

  }

  render() {
    return (
      <div className="log-in">
        <TopNav />
        <form>
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

          <Button type="submit">
            Log In
          </Button>
        </form>
      </div>
    )
  }
}

LogIn.propTypes = {
  onLogIn: PropTypes.func.isRequired,
}

export default LogIn;