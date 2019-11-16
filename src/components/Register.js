import React, { PureComponent } from 'react';
import { Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegisterBox from './RegisterBox';
import CardWrapper from './HOCs/CardWrapper';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Register extends PureComponent {

  componentDidMount() {
    // if user is logged in, redirect user to / (home) when they try to visit /register
    if (this.props.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div className="d-flex border-0 justify-content-center">
        <div className="inner-container d-flex flex-column flex-sm-row">
          <Col className="bg-white pt-2">
            <p>
              To fully enjoy the YMDb site, you just have to register for free with the following form. This information
              will mainly be used to identify you within the user community but will not be used for commercial purposes.
            </p>
            <CardWrapper
              icon="signature"
              title="Register"
              color="tan"
            >
              <RegisterBox />
            </CardWrapper>
          </Col>
          <Col>
            <div>
              <CardWrapper
                icon="award"
                rotate={ -5 }
                title="advantages"
                color="white"
                marginTopVal='0'
                marginTopValMobile='3'
                className="advantages-wrapper"
              >
                <div className="advantages">
                  <div>
                    Here are the advantages of being a registered user:<br/>
                    <FontAwesomeIcon icon="chevron-right" />	Create your own Top Movie List.<br/>
                    <FontAwesomeIcon icon="chevron-right" />	Discuss movies with other users.<br/>
                    <FontAwesomeIcon icon="chevron-right" />	Write comments on other user's Top List.<br/>
                  </div>
                </div>
              </CardWrapper>
              <CardWrapper
                icon="file-alt"
                rotate={ -5 }
                title="Privacy Statement"
                color="white"
              >
                <div>
                  <div>
                    We respect your privacy. It's simple: we do not share your personal
                    data with other companies or organizations, ever!
                  </div>
                </div>
              </CardWrapper>
              <div className="height-div-register noshow-mobile">
              </div>
            </div>
          </Col>
        </div>
      </div>
    )
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default withRouter(connect(mapStateToProps)(Register));
