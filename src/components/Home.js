import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CardWrapper from './CardWrapper';
import LoginBox from './LoginBox';
import NewRegistersBox from './NewRegistersBox';
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
        <div className="inner-container mt-4 p-0">
          <div className="bg-white pt-2 col">
            <div className="greeting m-0 row">
              Welcome to YMDb, Your Movie Database, the movie community where you can create your list of favorite movies,
              discover other people's favorite movies, and discuss movies and favorite lists. YMDb is free and fun!
            </div>
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
          </div>
          <div className="pt-0 col">
            { this.renderLoginBox() }
            <CardWrapper
              title="spotlight on a user"
              color="white"
              link="new-registers"
              marginTopVal={ this.props.isAuthenticated ? '0' : null }
            >
              <NewRegistersBox num={10} />
            </CardWrapper>
          </div>
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
