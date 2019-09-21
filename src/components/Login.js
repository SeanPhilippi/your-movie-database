import React, { PureComponent } from 'react';
import LoginBox from './LoginBox';
import CardWrapper from './CardWrapper';
import { Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearErrors } from '../redux/actions';

class Login extends PureComponent {
  render() {
    return (
      <div className="d-flex border-0 justify-content-center">
        <div className="inner-container mt-4 p-0">
          <Col className="bg-white pt-2">
            <CardWrapper
              icon="sign-in-alt"
              title="Login"
              color="tan"
            >
              <LoginBox />
            </CardWrapper>
          </Col>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({
  clearErrors
});

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
