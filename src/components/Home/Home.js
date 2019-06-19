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
          <HomeCard title='YMDB Top Movies' description=''/>
          <HomeCard title='Most Visited Lists' description=''/>
        </Col>
      </Container>
    )
  }
}

export default Home;