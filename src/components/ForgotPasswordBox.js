import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { forgotPassword, clearResetPasswordSuccess } from '../redux/actions';

class ForgotPasswordBox extends PureComponent {
  state = {
    email: '',
    submitting: false,
  };

  componentDidMount() {
    this.props.clearResetPasswordSuccess();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitting: true });
    this.props.forgotPassword(this.state.email.trim());
  };

  onTextChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { errors, resetPasswordSuccess } = this.props;
    const { submitting } = this.state;

    if (resetPasswordSuccess) {
      return (
        <Row className='d-flex flex-column'>
          <p className='py-2 px-4'>{resetPasswordSuccess}</p>
        </Row>
      );
    }

    return (
      <Row className='d-flex flex-column'>
        <form
          className='py-2 px-4 w-100'
          noValidate
          onSubmit={this.handleSubmit}
        >
          <div>
            <div className='login mb-2'>
              <div>Your email: </div>
              <input
                autoComplete='email'
                autoFocus
                name='email'
                onChange={this.onTextChange}
                type='email'
              />
              <div className='errors'>{errors.email}</div>
              <div className='errors'>{errors.general}</div>
            </div>
          </div>
          <div className='btn-container'>
            <div></div>
            <div className='d-flex justify-content-between align-items-center'>
              <button
                className='reset-pw-btn my-3'
                type='submit'
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </div>
          </div>
        </form>
      </Row>
    );
  }
}

ForgotPasswordBox.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  clearResetPasswordSuccess: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
    general: PropTypes.string,
  }).isRequired,
  resetPasswordSuccess: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  errors: state.authErrors,
  resetPasswordSuccess: state.resetPasswordSuccess,
});

const mapDispatchToProps = dispatch => ({
  forgotPassword: email => dispatch(forgotPassword(email)),
  clearResetPasswordSuccess: () => dispatch(clearResetPasswordSuccess()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordBox)
);
