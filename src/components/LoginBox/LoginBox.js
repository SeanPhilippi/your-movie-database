import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap/Form';
import { withRouter, NavLink } from 'react-router-dom';
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

    this.props.loginUser(user, this.props.history);
  }

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.props;

    return (
      <Row className="login-box d-flex flex-column shadow">
        <div className="login-title bg-red text-white m-0 p-2 pl-4">
          LOGIN
        </div>
        <div className="bg-white1">
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
                <div className="errors">
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
                <div className="errors">
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
}

const mapStateToProps = state => ({
  errors: state.authErrors
});

export default connect(mapStateToProps, { loginUser })(withRouter(LoginBox));