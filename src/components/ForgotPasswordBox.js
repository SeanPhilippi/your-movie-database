import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { loginUser } from '../redux/actions';
import { connect } from 'react-redux';
// import PasswordRevealer from '../PasswordRevealer/PasswordRevealer';

class ForgotPasswordBox extends PureComponent {
  state = {
    login: '',
    errors: {},
  };

  handleLogin = e => {
    const { loginUser, history } = this.props;

    const { login } = this.state;

    e.preventDefault();

    const user = {
      login: login.trim(),
    };
    loginUser(user, history);
  };

  onTextChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      errors: { login: loginErrors },
    } = this.props;

    return (
      <Row className='d-flex flex-column'>
        <form
          className='py-2 px-4 w-100'
          noValidate
          onSubmit={this.handleLogin}
        >
          <div>
            <div className='login mb-2'>
              <div>Your login: </div>
              <input
                autoComplete='off'
                autoFocus
                name='login'
                onChange={this.onTextChange}
                type='text'
              />
              <div className='errors'>{loginErrors}</div>
            </div>
          </div>
          <div className='btn-container'>
            <div></div>
            <div className='d-flex justify-content-between align-items-center'>
              <button className='reset-pw-btn my-3' type='submit'>
                Send Reset Instructions
              </button>
            </div>
          </div>
        </form>
      </Row>
    );
  }
}

ForgotPasswordBox.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    login: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  errors: state.authErrors,
});

const mapDispatchToProps = dispatch => ({
  // ! left off here, not created resetPassword action creator yet
  // resetPassword: (user, history) => dispatch(resetPassword(user, history)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordBox)
);
