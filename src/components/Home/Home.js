import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardWrapper from '../CardWrapper/CardWrapper';
import LoginBox from '../LoginBox/LoginBox';
import NewRegisters from '../NewRegisters/NewRegisters';

class Home extends PureComponent {
  renderLoginBox() {
    return this.props.isAuthenticated
      ? null
      : <CardWrapper title="Login" color="white">
          <LoginBox />
        </CardWrapper>;
  }

  render() {
    return (
      <div className="d-flex border-0 justify-content-center">
        <div className="inner-container mt-4 mx-4 p-0">
          <Col className="bg-white1 pt-2">
            <Row className="greeting m-0">
              Welcome to YMDb, Your Movie Database, the movie community where you can create your list of favorite movies,
              discover other people's favorite movies, and discuss movies and favorite lists. YMDb is free and fun!
            </Row>
            <CardWrapper color="tan" title='Top Movie List'/>
            <CardWrapper color="tan" title='Most Visited Lists'/>
          </Col>
          <Col className="ml-3 ">
            { this.renderLoginBox() }
            <CardWrapper title="Spotlight on a user" color="white">
              <NewRegisters />
            </CardWrapper>
          </Col>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
