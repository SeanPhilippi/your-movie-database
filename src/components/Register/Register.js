import React from 'react';
import { Container, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RegisterBox from '../RegisterBox/RegisterBox';

import './Register.css';

class Register extends React.PureComponent {

  render() {
    return (
      <Container className="container d-flex border-0 justify-content-center">
        <Col className="inner-container mt-4 mx-4 p-0">
          <Col className="main bg-white pt-2">
            <RegisterBox />
          </Col>
          <Col className="">
            <div className="advantages">
              <div className="text-white">
                Advantages
              </div>
              <div>
                Here are the advantages of being a registered user:<br/>
                  >	Create your own Top Movie List.<br/>
                  >	Discuss movies with other users.<br/>
                  >	Write comments on other user's Top List.<br/>
                  >	Receive the monthly newsletter containing :<br/>
                    -	updates & news about the site<br/>
                    -	the number of visitors on Your Top Movie list<br/>
                    -	the number of messages from other users on Your Top Movie list
              </div>
              <div className="privacy-statement">
                <div className="privacy-label text-white">
                  Privacy Statement
                </div>
                <div className="statement">
                  We respect your privacy. It's simple: we do not share your personal
                  data with other companies or organisations, ever!
                </div>
              </div>
            </div>
          </Col>
        </Col>
      </Container>
    )
  }
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Register);