import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Form, Row} from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../redux/actions';
import { connect } from 'react-redux';

import './RegisterBox.css';

class RegisterBox extends PureComponent {

  state = {
    email: '',
    password: '',
    errors: {}
  }

  handleRegister = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    }

    this.props.registerUser(user);
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <Row className="register-box bg-white d-flex flex-column">
        <div className="register-title bg-red text-white m-0 p-2 pl-4">
          REGISTER
        </div>
        <form
          className="py-2 px-4"
          noValidate
          onSubmit={this.handleLogin}
        >
          <div className="register-inputs">
            {/* username */}
            <div className="username mb-2">
              <div className="your-login">
                Your login/username:
              </div>
              <input
                name="username"
                onChange={this.onTextChange}
                className=""
                type="text"
              />
              <div style={{ color: 'red', textAlign: 'center' }}>
                { errors.username && errors.username }
              </div>
            </div>
            {/* email */}
            <div className="email mb-2">
              <div className="email-label">
                Your email:
              </div>
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
            {/* password */}
            <div className="register-password mb-2">
              <div className="password-label">
                Password:
              </div>
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
            {/* confirm password */}
            <div className="password2">
              <div className="password2-label">
                Retype password:
              </div>
              <input
                name="password2"
                onChange={this.onTextChange}
                className=""
                type="password2"
              />
              <div style={{ color: 'red', textAlign: 'center' }}>
                { errors.password2 && errors.password2 }
              </div>
            </div>
          </div>
          {/* send btn */}
          <div className="">
            <div></div>
            <div className="d-flex justify-content-end">
              <button
                className="register-btn my-3"
                type="submit"
              >
                Register
              </button>
            </div>
            <div></div>
          </div>
        </form>
      </Row>
    )

    // return (
    //   <div className="register">
    //     <form
    //       noValidate
    //       style={{width: '65%', flex: 1, margin: '3rem auto'}}
    //       onSubmit={this.handleSubmit}
    //     >
    //       <h2 style={{textAlign: 'center'}}>Sign Up</h2>
    //       <p style={{textAlign: 'center'}}><strong>Create your YMDb account</strong></p>
    //       <Form.Group>
    //         <Form.Label>Email</Form.Label>
    //         <Form.Control
    //           type="email"
    //           name="email"
    //           placeholder="Enter Email"
    //           value={this.state.email}
    //           onChange={this.onChange}
    //         />
    //         {errors.email && (<div style={{color: 'red'}}>{errors.email}</div>)}
    //         {/* {errors.email && (<FormControl.Feedback>{errors.email}</FormControl.Feedback>)} */}
    //       </Form.Group>

    //       <Form.Group>
    //         <Form.Label>Username</Form.Label>
    //         <Form.Control
    //           type="username"
    //           name="username"
    //           placeholder="Enter Username"
    //           value={this.state.username}
    //           onChange={this.onChange}
    //         />
    //         {errors.username && (<div style={{color: 'red'}}>{errors.username}</div>)}
    //         {/* {errors.username && (<FormControl.Feedback>{errors.username}</FormControl.Feedback>)} */}
    //       </Form.Group>

    //       <Form.Group>
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control
    //           type="password"
    //           name="password"
    //           placeholder="Enter Password"
    //           value={this.state.password}
    //           onChange={this.onChange}
    //         />
    //         {errors.password && (<div style={{color: 'red'}}>{errors.password}</div>)}
    //         {/* {errors.password && (<FormControl.Feedback>red{errors.password}</FormControl.Feedback>)} */}
    //       </Form.Group>

    //       <Form.Group>
    //         <Form.Label>Confirm Password</Form.Label>
    //         <Form.Control
    //           type="password"
    //           name="password2"
    //           placeholder="Confirm Password"
    //           value={this.state.password2}
    //           onChange={this.onChange}
    //         />
    //         {errors.password2 && (<div style={{color: 'red'}}>{errors.password2}</div>)}
    //         {/* <Form.Control.Feedback>{errors.password2}lldfkd</Form.Control.Feedback> */}
    //       </Form.Group>

    //       <Button type="submit">
    //         Register
    //       </Button>
    //     </form>
    //   </div>
    // )
  }
}

RegisterBox.propTypes = {
  registerUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  errors: state.authErrors
});

export default connect(mapStateToProps, { registerUser })(withRouter(RegisterBox));