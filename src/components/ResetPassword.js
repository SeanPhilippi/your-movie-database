import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CardWrapper from './HOCs/CardWrapper';
import { resetPassword } from '../redux/actions';
import PasswordRevealer from './PasswordRevealer';

class ResetPassword extends PureComponent {
  state = {
    password: '',
    password2: '',
    submitting: false,
    clientError: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { password, password2 } = this.state;

    if (password !== password2) {
      this.setState({ clientError: 'Passwords do not match.' });
      return;
    }
    if (password.length < 6) {
      this.setState({ clientError: 'Password must be at least 6 characters.' });
      return;
    }

    this.setState({ submitting: true, clientError: '' });
    const token = this.props.match.params.token;
    this.props.resetPassword(token, { password, password2 }, this.props.history);
  };

  onTextChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { errors } = this.props;
    const { submitting, clientError } = this.state;
    const hasTokenError = errors.general && errors.general.includes('invalid or expired');

    return (
      <div
        className='d-flex border-0 justify-content-center'
        style={{ flex: 1 }}
      >
        <div className='inner-container d-flex flex-column flex-sm-row'>
          <Col className='bg-white pt-2'>
            {hasTokenError ? (
              <div className='py-2 px-4'>
                <p className='errors'>{errors.general}</p>
                <Link to='/forgot-password'>Request a new reset link</Link>
              </div>
            ) : (
              <>
                <p>Enter your new password below.</p>
                <CardWrapper icon='lock' title='Reset Password' color='tan'>
                  <Row className='d-flex flex-column'>
                    <form
                      className='py-2 px-4 w-100'
                      noValidate
                      onSubmit={this.handleSubmit}
                    >
                      <div className='login mb-2'>
                        <div>New password: </div>
                        <PasswordRevealer
                          autoFocus
                          name='password'
                          onChange={this.onTextChange}
                        />
                        <div className='errors'>{errors.password}</div>
                      </div>
                      <div className='login mb-2'>
                        <div>Confirm password: </div>
                        <PasswordRevealer
                          name='password2'
                          onChange={this.onTextChange}
                        />
                        <div className='errors'>{errors.password2}</div>
                      </div>
                      <div className='errors'>{clientError}</div>
                      <div className='errors'>{errors.general}</div>
                      <div className='btn-container'>
                        <div></div>
                        <div className='d-flex justify-content-between align-items-center'>
                          <button
                            className='reset-pw-btn my-3'
                            type='submit'
                            disabled={submitting}
                          >
                            {submitting ? 'Updating...' : 'Update Password'}
                          </button>
                        </div>
                      </div>
                    </form>
                  </Row>
                </CardWrapper>
              </>
            )}
          </Col>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    password: PropTypes.string,
    password2: PropTypes.string,
    general: PropTypes.string,
  }).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  errors: state.authErrors,
});

const mapDispatchToProps = dispatch => ({
  resetPassword: (token, data, history) => dispatch(resetPassword(token, data, history)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
);
