import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { loginUser } from '../redux/actions';
import { connect } from 'react-redux';
// import PasswordRevealer from '../PasswordRevealer/PasswordRevealer';

class LoginBox extends PureComponent {
  state = {
    login: '',
    password: '',
    errors: {}
  };

  handleLogin = e => {
    const {
      loginUser,
      history,
    } = this.props;

    const {
      login,
      password,
    } = this.state;

    e.preventDefault();

    const user = {
      login,
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
        login: loginErrors,
        password: passwordErrors,
      },
    } = this.props;

    return (
      <Row className="d-flex flex-column">
        <div>
          <form
            className="login-main py-2 px-4 w-75 w-md-100"
            noValidate
            onSubmit={this.handleLogin}
          >
            <div>
              <div className="login mb-2">
                <div>Your login: </div>
                <input
                  autoComplete="off"
                  autoFocus
                  name="login"
                  onChange={this.onTextChange}
                  type="text"
                />
                <div className="errors">
                  { loginErrors }
                </div>
              </div>
              <div className="password">
                <div>Password: </div>
                <input
                  autoComplete="off"
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
              If you are not yet a registered user, <Link to="/register">click here to register
              now for free</Link> and discover all the interesting features for the members of YMDb.
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
