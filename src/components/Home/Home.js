import React from 'react';
import HomeCard from '../HomeCard/HomeCard';
import { Container, Row, Col, Card } from 'reactstrap';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Home.css';

class Home extends React.PureComponent {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/home')
    }
  }

  render() {
    return (
      <Container className="container d-flex justify-content-center">
        <Col className="inner-container mt-4 mx-4 p-0">
          <Col className="main bg-white pt-2">
            <Row className="greeting m-0">
              Welcome to YMDb, Your Movie Database, the movie community where you can create your list of favorite movies,
              discover other people's favorite movies, discuss about movies and favorite lists, ... YMDb is free and fun!
            </Row>
            <HomeCard title='Top Movie List' description=''/>
            <HomeCard title='Most Visited Lists' description=''/>
          </Col>
          <Col className="ml-3 ">
            <Row className="login-box d-flex flex-column p-2">
              <span>Your login: </span> <input type="text"/>
              <span>Password: </span> <input type="text"/>
              <button>Send</button>
              <p>
                If you are not yet a registered user, <a href="">click here to register now for free</a> and discover all the interesting features for the members of YMDb.
              </p>
            </Row>
          </Col>
        </Col>
      </Container>
    )
  }
}

export default Home;