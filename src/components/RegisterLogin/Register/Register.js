import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerUser } from '../../../redux/actions';

import './Register.css';

class Register extends PureComponent {
  state = {
    email: '',
    username: '',
    password: '',
    password2: '',
    errors: {},
  };

  componentDidMount() {
    const {
      isAuthenticated,
      history,
    } = this.props;

    if (isAuthenticated) {
      history.push('/')
    }
  }

  static getDerivedStateFromProps({ errors }) {
    if (errors) return { errors };
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  };

  handleSubmit = e => {
    e.preventDefault();

    const {
      registerUser,
      history,
    } = this.props;

    const {
      errors,
      ...newUser,
    } = this.state;

    registerUser(newUser, history);
  };

// ! left off: seperate Login and Register to be their own pages to avoid sharing errors
  render() {
    const {
      email,
      password,
      errors: {
        email: emailErrors,
        username: usernameErrors,
        password: passwordErrors,
        password2: password2Errors,
      },
    } = this.state;

    console.log('errors:', errors);

    return (
      <div className="register">
        <form
          noValidate
          style={{width: '65%', flex: 1, margin: '3rem auto'}}
          onSubmit={this.handleSubmit}
        >
          <h2 style={{textAlign: 'center'}}>
            Sign Up
          </h2>
          <p style={{textAlign: 'center'}}>
            <strong>
              Create your YMDb account
            </strong>
          </p>
          <Form.Group>
            <Form.Label>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={this.onChange}
            />
            {emailErrors && (
              <div style={{color: 'red'}}>
                { emailErrors }
              </div>
            )}
            {/* {errors.email && (<FormControl.Feedback>{errors.email}</FormControl.Feedback>)} */}
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Username
            </Form.Label>
            <Form.Control
              type="username"
              name="username"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.onChange}
            />
            {usernameErrors && (
              <div style={{color: 'red'}}>
                { usernameErrors }
              </div>
            )}
            {/* {errors.username && (<FormControl.Feedback>{errors.username}</FormControl.Feedback>)} */}
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.onChange}
            />
            {passwordErrors && (
              <div style={{color: 'red'}}>
                { passwordErrors }
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={password2}
              onChange={this.onChange}
            />
            {password2Errors && (
              <div style={{color: 'red'}}>
                { password2Errors }
              </div>
            )}
            {/* <Form.Control.Feedback>{errors.password2}lldfkd</Form.Control.Feedback> */}
          </Form.Group>
          <Button type="submit">
            Register
          </Button>
        </form>
      </div>
    )
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  errors: state.authErrors
});

const mapDispatchToProps = dispatch => ({
  registerUser: (userdata, history) => dispatch(registerUser(user, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
