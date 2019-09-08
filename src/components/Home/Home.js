import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardWrapper from '../CardWrapper/CardWrapper';
import LoginBox from '../LoginBox/LoginBox';
import NewRegistersBox from '../NewRegistersBox/NewRegistersBox';
// import fontAwesome from './utils';

class Home extends PureComponent {
  renderLoginBox() {
    return this.props.isAuthenticated
      ? null
      : <CardWrapper
          icon="sign-in-alt"
          title="login"
          color="white"
          marginTopVal='0'
        >
          <LoginBox />
        </CardWrapper>;
  }

  render() {
    return (
      <div className="d-flex border-0 justify-content-center h-100">
        <div className="inner-container mt-4 mx-4 p-0 h-100">
          <Col className="bg-white pt-2">
            <Row className="greeting m-0">
              Welcome to YMDb, Your Movie Database, the movie community where you can create your list of favorite movies,
              discover other people's favorite movies, and discuss movies and favorite lists. YMDb is free and fun!
            </Row>
            <CardWrapper
              icon={["far", "list-alt"]}
              rotate={ -5 }
              color="tan"
              title='top movie list'
            />
            <CardWrapper
              icon="shoe-prints"
              rotate={ 30 }
              color="tan"
              title='most visited lists'
            />
          </Col>
          <Col className="ml-3 pt-0 h-100">
            { this.renderLoginBox() }
            <CardWrapper
              title="spotlight on a user"
              color="white"
              marginTopVal={ this.props.isAuthenticated ? '0' : null }
            >
              <NewRegistersBox num={10} />
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
