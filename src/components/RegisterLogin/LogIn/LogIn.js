import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class LogIn extends Component {

  state = {
    email: '',
    password: '',
    // authenticated: localStorage.getItem('token') || false, //* put this in the redux global state?
  }

  handleLogIn(credentials) {
    fetch('login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }).then(res => {
      if (res.status === 401) {
        this.setState({
          authError: 'Login is invalid'
        })
      } else res.json()
    }).then(data => {
      const { token } = data;
      localStorage.setItem('token', token);
      this.setState({
        authError: '',
        authenticated: token
      })
    })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    console.log(user)
  }

  render() {
    return (
      <div className="log-in">
        <form 
          noValidate
          style={{width: '65%', flex: 1, margin: '3rem auto'}}
          onSubmit={this.handleSubmit}  
        >
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control 
              name="email"
              onChange={this.onChange}
              submit={this.handleSubmit}
              placeholder="Enter Email"
              value={this.state.email}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={this.onChange}
              submit={this.handleSubmit}
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