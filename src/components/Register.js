import React, { PureComponent } from 'react';
import { Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegisterBox from './RegisterBox';
import CardWrapper from './CardWrapper';
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
        <div className="inner-container mt-4 p-0">
          <Col className="bg-white pt-2">
            <p className="">
              To fully enjoy the YMDb site, you just have to register for free with the following form. This information
              will mainly be used to identify you within the user community but will not be used for commercial purposes.
              If you want to know why we need specific data you can find <a href="">more detailed information here</a>.
            </p>
            <CardWrapper
              icon="signature"
              title="Register"
              color="tan"
            >
              <RegisterBox />
            </CardWrapper>
          </Col>
          <Col className="">
            <div className="">
              <CardWrapper
                icon="award"
                rotate={ -5 }
                title="advantages"
                color="white"
                marginTopVal="0"
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
