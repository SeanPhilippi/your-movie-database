import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl' 
import { onRegister } from '../../../redux/actions';

class Register extends Component {

  state = {
    email: '',
    username: '',
    password: '',
    password2: '',
    errors: {},
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/home')
    }
  }

  // * migrate to getDerivedStateToProps
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

// * left off: seperate Login and Register to be their own pages to avoid sharing errors
  render() {
    const { errors } = this.state;

    console.log('errors', errors)

    return (
      <div className="register">
        <form 
          noValidate
          style={{width: '65%', flex: 1, margin: '3rem auto'}}
          onSubmit={this.handleSubmit}  
        >
          <h2 style={{textAlign: 'center'}}>Sign Up</h2>
          <p style={{textAlign: 'center'}}><strong>Create your YMDB account</strong></p>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={this.state.email}
              onChange={this.onChange}
            />
            {errors.email && (<div style={{color: 'red'}}>{errors.email}</div>)}
            {/* {errors.email && (<FormControl.Feedback>{errors.email}</FormControl.Feedback>)} */}
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
            {errors.username && (<div style={{color: 'red'}}>{errors.username}</div>)}
            {/* {errors.username && (<FormControl.Feedback>{errors.username}</FormControl.Feedback>)} */}
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
            {errors.password && (<div style={{color: 'red'}}>{errors.password}</div>)}
            {/* {errors.password && (<FormControl.Feedback>red{errors.password}</FormControl.Feedback>)} */}
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
            {errors.password2 && (<div style={{color: 'red'}}>{errors.password2}</div>)}
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
  onRegister: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  errors: state.authErrors
})
// destructuring mapDispatchToProps for onRegister
export default connect(mapStateToProps, { onRegister })(withRouter(Register));