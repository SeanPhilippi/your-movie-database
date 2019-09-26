import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CardWrapper from './HOCs/CardWrapper';
import LoginBox from './LoginBox';
import NewRegistersBox from './NewRegistersBox';
import ViewableList from './ViewableList';
// import TopMovieList from './TopMovieList';

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
    const Greeting = ({ addClass }) => (
      <div className={`${ addClass } m-0 row`}>
        Welcome to YMDb, Your Movie Database, the movie community where you can create your list of favorite movies,
        discover other people's favorite movies, and discuss movies and favorite lists. YMDb is free and fun!
      </div>
    );

    return (
      <div className="d-flex border-0 justify-content-center">
        <div className="inner-container mt-4 p-0">
          <div className="bg-white pt-2 col left-col">
            <Greeting addClass="greeting" />
            <CardWrapper
              icon={["far", "list-alt"]}
              rotate={ -5 }
              color="tan"
              link="top-movies"
              title="top movie list"
            >
              <div className="pb-2">
                Top movies based on the favorites of { this.props.newUsers.length } registered users.
              </div>
              <ViewableList />
              <hr className="mt-4"/>
              <Link to="/top-movies">Go to the complete Top Movie List</Link>
            </CardWrapper>
            <CardWrapper
              icon="shoe-prints"
              rotate={ 30 }
              color="tan"
              title="most visited lists"
            >

            </CardWrapper>
          </div>
          <div className="pt-0 col right-col">
            <Greeting addClass="greeting-mobile mb-3" />
            {
              this.renderLoginBox()
            }
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
  newUsers: state.newUsers,
});

export default connect(mapStateToProps)(Home);
