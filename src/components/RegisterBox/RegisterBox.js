import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../redux/actions';
import { connect } from 'react-redux';
// import PasswordRevealer from '../PasswordRevealer/PasswordRevealer';

import './RegisterBox.css';

class RegisterBox extends PureComponent {
  state = {
    username: '',
    email: '',
    password: '',
    password2: '',
    errors: {},
  };

  handleRegister = e => {
    const {
      username,
      email,
      password,
      password2,
    } = this.state;

    e.preventDefault();

    const user = {
      username,
      email,
      password,
      password2,
    };

    this.props.registerUser(user, this.props.history);
  };

  onTextChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const {
      errors: {
        email: emailErrors,
        password: passwordErrors,
        password2: password2Errors,
        username: usernameErrors,
      },
    } = this.props;

    return (
      <Row className="register-box shadow bg-white1 d-flex flex-column mb-4 mx-3">
        <div className="register-title bg-red text-white m-0 p-2 pl-4 font-weight-bold">
          REGISTER
        </div>
        <div className="bg-light1">
          <span className="font-weight-bold px-4 py-2">
            * = mandatory
          </span>
          <form
            className="py-2 px-4"
            noValidate
            onSubmit={this.handleRegister}
          >
            <div className="register-inputs">
              {/* username */}
              <div className="username mb-2">
                <div className="your-login font-weight-bold">
                  Login/username*
                </div>
                <input
                  name="username"
                  onChange={this.onTextChange}
                  className=""
                  type="text"
                />
                <div style={{ color: 'red', textAlign: 'center' }}>
                  { usernameErrors }
                </div>
              </div>
              {/* email */}
              <div className="email mb-2">
                <div className="email-label font-weight-bold">
                  Email*
                </div>
                <input
                  name="email"
                  onChange={this.onTextChange}
                  className=""
                  type="text"
                />
                <div style={{ color: 'red', textAlign: 'center' }}>
                  { emailErrors }
                </div>
              </div>
              {/* password */}
              <div className="register-password mb-2">
                <div className="password-label font-weight-bold">
                  Password*
                </div>
                <input
                  name="password"
                  onChange={this.onTextChange}
                  className=""
                  type="password"
                />
                <div style={{ color: 'red', textAlign: 'center' }}>
                  { passwordErrors }
                </div>
              </div>
              {/* confirm password */}
              <div className="password2">
                <div className="password2-label font-weight-bold">
                  Retype password*
                </div>
                <input
                  name="password2"
                  onChange={this.onTextChange}
                  className=""
                  type="password2"
                />
                <div style={{ color: 'red', textAlign: 'center' }}>
                  { password2Errors }
                </div>
              </div>
            </div>
            {/* send btn */}
            <div className="">
              <div></div>
              <div className="">
                <button
                  className="register-btn my-3"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </Row>
    )
  }
}

RegisterBox.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.authErrors
});

const mapDispatchToProps = dispatch => ({
  registerUser: user => dispatch(registerUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterBox));
