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
      <Container className="container d-flex border-0 justify-content-center">
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
            <Row className="login-box bg-white d-flex flex-column">
              <div className="login-title bg-red text-white m-0 p-2 pl-4">LOGIN</div>
                <div className="login-main p-2 d-flex">
                  <div className="input-labels flex-column d-flex pr-2">
                    <span className="text-nowrap pb-2">Your login: </span>
                    <span className="text-nowrap pt-2">Password: </span>
                  </div>
                  <div>
                    <div>
                      <input className="mb-2" type="text"/>
                      <input type="text"/>
                    </div>
                    <button className="pull-left send-btn my-3">Send</button>
                  </div>
                </div>
                <p className="px-2">
                  <small>If you are not yet a registered user, <a href="">click here to register now for free</a> and discover all the interesting features for the members of YMDb.</small>
                </p>
            </Row>
          </Col>
        </Col>
      </Container>
    )
  }
}

export default Home;