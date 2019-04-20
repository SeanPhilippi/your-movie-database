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
      <Container style={{ border: '1px solid black', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Row>
          <Col>
            Your Movie Database
          </Col>
          <Row style={{flex: 1, flexDirection: 'row', border: '1px red solid'}}>
            <Col xs="6" md="4">
              Home
            </Col>
            <Col xs="6">
              Top Movie List
            </Col>
            <Col xs="6" md="4">
              Your Top List
            </Col>
            <Col xs="6" md="4">
              Users Index
            </Col>
            <Col xs="6" md="4">
              All The Movies
            </Col>
          </Row>
        </Row> */}
  
        <Col style={{width: '80%', height: '60rem', flex: 1, flexDirection: 'column', justifyContent: 'space-between', border: 'solid 1px black'}}>
          <Row>
            <HomeCard title='YMDB Top Movies' description=''/>
          </Row>
          <Row>
            <HomeCard title='Most Visited Lists' description=''/>
          </Row>
        </Col>
      </Container>
    )
  }
}

export default Home;