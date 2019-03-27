import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { onRegister } from '../../../redux/actions';

class Register extends Component {

  state = {
    email: '',
    username: '',
    password: '',
    password2: '',
    errors: { 
      // testing
      email: 'email error', 
      username: 'username error',
      password: 'pw error',
      password2: 'pw2 error'
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    }
    this.props.onRegister(newUser, this.props.history);
  }
// * left off: working on error feedback rendering
  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <form 
          noValidate
          style={{width: '65%', flex: 1, margin: '3rem auto'}}
          onSubmit={this.handleSubmit}  
        >
          {this.props.error && this.renderError()}
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.onChange}
            />

            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              name="username"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.onChange}
            />

            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={this.state.password}
              onChange={this.onChange}
            />

            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>              
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="password2"
              placeholder="Confirm Password"
              value={this.state.password2}
              onChange={this.onChange}
            />

            <Form.Control.Feedback type="invalid">
              {errors.password2}
            </Form.Control.Feedback>              
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
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.errors.isRequired
// }

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})
// destructuring mapDispatchToProps for onRegister
export default connect(mapStateToProps, { onRegister })(withRouter(Register));