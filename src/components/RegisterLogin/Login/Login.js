import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions'
import './Login.css';

class Login extends PureComponent {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  componentDidMount() {
    const {
      isAuthenticated,
      history,
    } = this.props;

    if (isAuthenticated) {
      history.push('/')
    }
  }

  static getDerivedStateFromProps({ isAuthenticated, errors }, prevState) {
    if (isAuthenticated) this.props.history.push('/');
    if (errors) return { errors, };
  }

  handleLogin = e => {
    e.preventDefault();

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  };

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const {
      errors: {
        password: passwordErrors,
        email: emailErrors,
      },
      passowrd,
      email,
    } = this.state;

    return (
      <div className="log-in">
        <form
          noValidate
          style={{ width: '65%', flex: 1, margin: '3rem auto' }}
          onSubmit={this.handleLogin}
        >
          <h2 className="text-center">
            Log In
          </h2>
          <p className="text-center">
            <strong>
              Sign in to your YMDb account
            </strong>
          </p>
          <Form.Group>
            <Form.Label>
              Email
            </Form.Label>
            <Form.Control
              name="email"
              // ! check this, understand this before using
              // className={classnames('form-control form-control-lg', { 'is-invalid': errors.email})}
              onChange={this.onChange}
              placeholder="Enter Email"
              value={email}
            />
            {emailErrors && (
              <div style={{ color: 'red' }}>
                { emailErrors }
              </div>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>
              Password
            </Form.Label>
            <Form.Control
              // className={classnames('form-control form-control-lg', { 'is-invalid': errors.email})}
              name="password"
              type="password"
              onChange={this.onChange}
              placeholder="Enter Password"
              value={password}
            />
            {passwordErrors && (
              <div style={{ color: 'red' }}>
                { passwordErrors }
              </div>
            )}
          </Form.Group>
          <button
            lass="login-btn"
            type="submit"
          >
            Log In
          </button>
        </form>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  errors: state.authErrors
});

const mapDispatchToProps = dispatch => ({
  loginUser: (user, history) => dispatch(loginUser(user, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
