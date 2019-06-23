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
        <Col className="inner-container d-flex justify-content-center">
          <Col className="bg-white mt-4 p-4">
            <Row className="greeting m-0">
              Welcome to YMDB, Your Movie Database, the movie community where you can create your list of favorite movies,
              discover other people's favorite movies, discuss about movies and favorite lists, ... YMDB is free and fun!
            </Row>
            <HomeCard title='Top Movie List' description=''/>
            <HomeCard title='Most Visited Lists' description=''/>
          </Col>
        </Col>
      </Container>
    )
  }
}

export default Home;