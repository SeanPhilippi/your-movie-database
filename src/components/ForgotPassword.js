import React, { PureComponent } from 'react';
import { Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ForgotPasswordBox from './ForgotPasswordBox';
import CardWrapper from './HOCs/CardWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ForgotPassword extends PureComponent {
  componentDidMount() {
    // if user is logged in, redirect user to / (home) when they try to visit /register
    // if (this.props.isAuthenticated) {
    //   this.props.history.push('/');
    // }
  }

  render() {
    return (
      <div
        className='d-flex border-0 justify-content-center'
        style={{ flex: 1 }}
      >
        <div className='inner-container d-flex flex-column flex-sm-row'>
          <Col className='bg-white pt-2'>
            <p>
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </p>
            <p>
              For security reasons, we do <b>NOT</b> store your password. So rest
              assured that we will never send your password via email.
            </p>
            <CardWrapper icon='signature' title='Forgot Password' color='tan'>
              <ForgotPasswordBox />
            </CardWrapper>
          </Col>
          <Col>
            <div>
              <CardWrapper
                icon='award'
                rotate={-5}
                title='advantages'
                color='white'
                marginTopVal='0'
                marginTopValMobile='3'
                className='advantages-wrapper'
              >
                <div className='advantages'>
                  <div>
                    Here are the advantages of being a registered user:
                    <br />
                    <FontAwesomeIcon icon='chevron-right' /> Create your own Top
                    Movie List.
                    <br />
                    <FontAwesomeIcon icon='chevron-right' /> Discuss movies with
                    other users.
                    <br />
                    <FontAwesomeIcon icon='chevron-right' /> Write comments on
                    other user's Top List.
                    <br />
                  </div>
                </div>
              </CardWrapper>
              <CardWrapper
                icon='file-alt'
                rotate={-5}
                title='Privacy Statement'
                color='white'
              >
                <div>
                  <div>
                    We respect your privacy. It's simple: we do not share your
                    personal data with other companies or organizations, ever!
                  </div>
                </div>
              </CardWrapper>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(ForgotPassword));
