import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../../redux/actions'
import { connect } from 'react-redux';
import classnames from 'classnames';

class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: {}
  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/home')
    }
  }

  componentWillReceiveProps(nextProps) { // * deprecated, look into replacing
    if (nextProps.isAuthenticated) {
      this.props.history.push('/home');
    }

    if (nextProps.errors) {
      this.setState(() => ({errors: nextProps.errors}));
    }
  }

  handleLogin = e => {
    e.preventDefault(); 

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(user);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log('target', e.target)
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="log-in">
        <form 
          noValidate
          style={{width: '65%', flex: 1, margin: '3rem auto'}}
          onSubmit={this.handleLogin}  
        >
          <h2 style={{textAlign: 'center'}}>Log In</h2>
          <p style={{textAlign: 'center'}}><strong>Sign in to your YMDB account</strong></p>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control 
              name="email"
              // ! check this, understand this before using
              // className={classnames('form-control form-control-lg', { 'is-invalid': errors.email})} 
              onChange={this.onChange}
              placeholder="Enter Email"
              value={this.state.email}
            />
            {errors.email && (<div style={{color: 'red'}}>{errors.email}</div>)}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              // className={classnames('form-control form-control-lg', { 'is-invalid': errors.email})}
              name="password"
              type="password"
              onChange={this.onChange}
              placeholder="Enter Password"
              value={this.state.password}
            />    
            {errors.password && (<div style={{color: 'red'}}>{errors.password}</div>)}          
          </Form.Group>

          <Button type="submit">
            Log In
          </Button>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  errors: state.authErrors
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));