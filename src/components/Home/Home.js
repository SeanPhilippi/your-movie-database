import React from 'react';
import HomeCard from '../HomeCard/HomeCard';
import LoginBox from '../LoginBox/LoginBox';
import NewRegisters from '../NewRegisters/NewRegisters';
import { Container, Row, Col, Card } from 'reactstrap';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Home.css';

class Home extends React.PureComponent {
  // componentDidMount() {
  //   if (this.props.isAuthenticated) {
  //     this.props.history.push('/home')
  //   }
  // }

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
            {
              this.props.isAuthenticated ? null : <LoginBox />
            }
            <NewRegisters />
          </Col>
        </Col>
      </Container>
    )
  }
}

export default Home;