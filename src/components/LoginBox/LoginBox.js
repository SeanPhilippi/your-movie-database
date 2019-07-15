import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Form, Row} from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../redux/actions';
import { connect } from 'react-redux';

import './LoginBox.css';

class LoginBox extends PureComponent {

  state = {
    email: '',
    password: '',
    errors: {}
  }

  handleLogin = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.loginUser(user);
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <Row className="login-box bg-white d-flex flex-column">
        <div className="login-title bg-red text-white m-0 p-2 pl-4">LOGIN</div>
          <form
            className="login-main py-2 px-4"
            noValidate
            onSubmit={this.handleLogin}
          >
            <div className="login-pass">
              <div className="login mb-2">
                <div className="your-login">Your login: </div>
                <input
                  name="email"
                  onChange={this.onTextChange}
                  className=""
                  type="text"
                />
                <div style={{ color: 'red', textAlign: 'center' }}>
                  { errors.email && errors.email }
                </div>
              </div>
              <div className="password">
                <div className="">Password: </div>
                <input
                  name="password"
                  onChange={this.onTextChange}
                  className=""
                  type="password"
                />
                <div style={{ color: 'red', textAlign: 'center' }}>
                  { errors.password && errors.password }
                </div>
              </div>
            </div>
            <div className="btn-container">
              <div></div>
              <div className="d-flex justify-content-end">
                <button
                  className="send-btn my-3"
                  type="submit"
                >
                  Send
                </button>
              </div>
              <div></div>
            </div>
          </form>
          <p className="px-4">
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