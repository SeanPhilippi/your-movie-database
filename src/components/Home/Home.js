import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardWrapper from '../CardWrapper/CardWrapper';
import LoginBox from '../LoginBox/LoginBox';
import NewRegistersBox from '../NewRegistersBox/NewRegistersBox';
import { faListAlt, faShoePrints, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

class Home extends PureComponent {
  renderLoginBox() {
    return this.props.isAuthenticated
      ? null
      : <CardWrapper
          icon={ faSignInAlt }
          title="login"
          color="white"
        >
          <LoginBox />
        </CardWrapper>;
  }

  render() {
    return (
      <div className="d-flex border-0 justify-content-center">
        <div className="inner-container mt-4 mx-4 p-0">
          <Col className="white pt-2">
            <Row className="greeting m-0">
              Welcome to YMDb, Your Movie Database, the movie community where you can create your list of favorite movies,
              discover other people's favorite movies, and discuss movies and favorite lists. YMDb is free and fun!
            </Row>
            <CardWrapper
              icon={ faListAlt }
              color="tan"
              title='top movie list'
            />
            <CardWrapper
              icon={ faShoePrints }
              color="tan"
              title='most visited lists'
            />
          </Col>
          <Col className="ml-3 ">
            { this.renderLoginBox() }
            <CardWrapper
              title="spotlight on a user"
              color="white"
            >
              <NewRegistersBox />
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
