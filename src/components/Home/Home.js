import React, { PureComponent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardWrapper from '../CardWrapper/CardWrapper';
import LoginBox from '../LoginBox/LoginBox';
import NewRegisters from '../NewRegisters/NewRegisters';
import './Home.css';

class Home extends PureComponent {
  renderLoginBox() {
    return this.props.isAuthenticated
      ? null
      : <CardWrapper title="Login"><LoginBox /></CardWrapper>;
  }

  render() {
    return (
      <Container className="container d-flex border-0 justify-content-center">
        <Col className="inner-container mt-4 mx-4 p-0">
          <Col className="main bg-white1 pt-2">
            <Row className="greeting m-0">
              Welcome to YMDb, Your Movie Database, the movie community where you can create your list of favorite movies,
              discover other people's favorite movies, `discuss about movies and favorite lists, ... YMDb is free and fun!
            </Row>
            <CardWrapper color="tan" title='Top Movie List'/>
            <CardWrapper title='Most Visited Lists'/>
          </Col>
          <Col className="ml-3 ">
            { this.renderLoginBox() }
            <CardWrapper title="Spotlight on a user">
              <NewRegisters />
            </CardWrapper>
          </Col>
        </Col>
      </Container>
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
