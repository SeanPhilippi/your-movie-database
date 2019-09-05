import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { loginUser } from '../../redux/actions';
import { connect } from 'react-redux';
// import PasswordRevealer from '../PasswordRevealer/PasswordRevealer';

import './LoginBox.css';

class LoginBox extends PureComponent {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  handleLogin = e => {
    const {
      loginUser,
      history,
    } = this.props;

    const {
      email,
      password,
    } = this.state;

    e.preventDefault();

    const user = {
      email,
      password,
    };

    loginUser(user, history);
  };

  onTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const {
      errors: {
        email: emailErrors,
        password: passwordErrors,
      },
    } = this.props;

    return (
      <Row className="d-flex flex-column">
        <div>
          <form
            className="login-main py-2 px-4"
            noValidate
            onSubmit={this.handleLogin}
          >
            <div>
              <div className="login mb-2">
                <div>Your login: </div>
                <input
                  name="email"
                  onChange={this.onTextChange}
                  type="text"
                />
                <div className="errors">
                  { emailErrors }
                </div>
              </div>
              <div className="password">
                <div>Password: </div>
                <input
                  name="password"
                  onChange={this.onTextChange}
                  type="password"
                />
                <div className="errors">
                  { passwordErrors }
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
            <small>
              If you are not yet a registered user, <NavLink to="/register">click here to register
              now for free</NavLink> and discover all the interesting features for the members of YMDb.
            </small>
          </p>
        </div>
      </Row>
    )
  }
}

LoginBox.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.authErrors
});

const mapDispatchToProps = dispatch => ({
  loginUser: (user, history) => dispatch(loginUser(user, history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginBox));
