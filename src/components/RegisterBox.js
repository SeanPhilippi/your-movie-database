import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../redux/actions';
import { connect } from 'react-redux';
import { clearErrors } from '../redux/actions';
// import PasswordRevealer from '../PasswordRevealer/PasswordRevealer';

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
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      password2: password2.trim(),
    };
    this.props.clearErrors();
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
      <Row className="register-box d-flex flex-column">
        <div>
          <span className="font-weight-bold px-4 py-2">
            <span style={{ color: 'red' }}>* = mandatory</span>
          </span>
          <form
            className="py-2 px-4"
            noValidate
            onSubmit={this.handleRegister}
          >
            <div>
              {/* username */}
              <div className="mb-2">
                <div className="your-login font-weight-bold">
                  Login/Username&nbsp;<span style={{ color: 'red' }}>*</span>
                </div>
                <input
                  autoComplete="off"
                  autoFocus
                  name="username"
                  onChange={this.onTextChange}
                  className="w-75 w-md-50"
                  type="text"
                />
                <div style={{ color: 'red' }}>
                  { usernameErrors }
                </div>
              </div>
              {/* email */}
              <div className="email mb-2">
                <div className="email-label font-weight-bold">
                  Email <span style={{ color: 'red' }}>*</span>
                </div>
                <input
                  autoComplete="off"
                  name="email"
                  onChange={this.onTextChange}
                  className="w-75 w-md-50"
                  type="text"
                />
                <div style={{ color: 'red' }}>
                  { emailErrors }
                </div>
              </div>
              {/* password */}
              <div className="register-password mb-2">
                <div className="password-label font-weight-bold">
                  Password <span style={{ color: 'red' }}>*</span>
                </div>
                <input
                  autoComplete="off"
                  name="password"
                  onChange={this.onTextChange}
                  className="w-75 w-md-50"
                  type="password"
                />
                <div style={{ color: 'red' }}>
                  { passwordErrors }
                </div>
              </div>
              {/* confirm password */}
              <div>
                <div className="password2-label font-weight-bold">
                  Retype Password <span style={{ color: 'red' }}>*</span>
                </div>
                <input
                  autoComplete="off"
                  name="password2"
                  onChange={this.onTextChange}
                  className="w-75 w-md-50"
                  type="password"
                />
                <div style={{ color: 'red' }}>
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
    );
  };
};

RegisterBox.propTypes = {
  registerUser: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
    password2: PropTypes.string,
    username: PropTypes.string,
  }).isRequired
};

const mapStateToProps = state => ({
  errors: state.authErrors
});

const mapDispatchToProps = dispatch => ({
  registerUser: (user, history) => dispatch(registerUser(user, history)),
  clearErrors
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterBox));