import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import TopNav from '../TopNav/TopNav';

class LogIn extends Component {

  state = {
    username: '',
    password: '',
    error: '',
    authenticated: localStorage.getItem('token') || false
  }

  // TODO: review localstorage and JSON.stringify
  // handleLogIn(credentials) {
  //   fetch('/login', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(credentials)
  //   }).then(res => {
  //     if (res.status === 401) {
  //       this.setState({
  //         error: 'Login is invalid'
  //       })
  //     } else res.json()
  //   }).then(data => {
  //     const { token } = data;
  //     localStorage.setItem('token', token);
  //     this.setState({
  //       error: '',
  //       authenticated: token
  //     })
  //   })
  // }

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
              name="username"
              onChange={e => {
                this.setState({[e.target.name]: e.target.value});
              }}
              placeholder="Enter Username"
              value={this.state.username}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={e => {
                this.setState({[e.target.name]: e.target.value});
              }}
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

// LogIn.propTypes = {
//   onLogIn: PropTypes.func.isRequired,
// }

export default LogIn;