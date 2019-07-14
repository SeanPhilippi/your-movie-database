import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Form, Row} from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../redux/actions';
import { connect } from 'react-redux';
import classnames from 'classnames';

import './LoginBox.css';

class LoginBox extends PureComponent {

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

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isAuthenticated) {
      this.props.history.push('/home');
    }

    if (nextProps.errors) {
      return { errors: nextProps.errors };
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
  }

  render() {
    const { errors } = this.state;

    return (
      <Row className="login-box bg-white d-flex flex-column">
        <div className="login-title bg-red text-white m-0 p-2 pl-4">LOGIN</div>
          <div className="login-main p-2 d-flex">
            <div className="input-labels flex-column d-flex pr-2">
              <span className="text-nowrap pb-2">Your login: </span>
              <span className="text-nowrap pt-2">Password: </span>
            </div>
            <div>
              <div>
                <input className="mb-2" type="text"/>
                <input type="text"/>
              </div>
              <button className="pull-left send-btn my-3">Send</button>
            </div>
          </div>
          <p className="px-2">
            <small>If you are not yet a registered user, <a href="">click here to register now for free</a> and discover all the interesting features for the members of YMDb.</small>
          </p>
      </Row>
    )

    // return (
    //   <div className="log-in">
    //     <form
    //       noValidate
    //       style={{ width: '65%', flex: 1, margin: '3rem auto' }}
    //       onSubmit={this.handleLogin}
    //     >
    //       <h2 className="text-center">Log In</h2>
    //       <p className="text-center"><strong>Sign in to your YMDb account</strong></p>
    //       <Form.Group>
    //         <Form.Label>Email</Form.Label>
    //         <Form.Control
    //           name="email"
    //           // ! check this, understand this before using
    //           // className={classnames('form-control form-control-lg', { 'is-invalid': errors.email})}
    //           onChange={this.onChange}
    //           placeholder="Enter Email"
    //           value={this.state.email}
    //         />
    //         {errors.email && (<div style={{ color: 'red' }}>{errors.email}</div>)}
    //       </Form.Group>

    //       <Form.Group>
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control
    //           // className={classnames('form-control form-control-lg', { 'is-invalid': errors.email})}
    //           name="password"
    //           type="password"
    //           onChange={this.onChange}
    //           placeholder="Enter Password"
    //           value={this.state.password}
    //         />
    //         {errors.password && (<div style={{ color: 'red' }}>{errors.password}</div>)}
    //       </Form.Group>

    //       <button class="login-btn" type="submit">
    //         Log In
    //       </button>
    //     </form>
    //   </div>
    // )
  }
}

LoginBox.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  errors: state.authErrors
});

export default connect(mapStateToProps, { loginUser })(withRouter(LoginBox));