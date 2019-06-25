import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import RegisterLogin from './components/RegisterLogin/RegisterLogin';
import TopNav from './components/TopNav/TopNav';
import Home from './components/Home/Home';
import { Container } from 'reactstrap';
import Profile from './components/Profile/Profile';
import TopMovieList from './components/TopMovieList/TopMovieList';
import MoviePage from './components/MoviePage/MoviePage';
import UpdateBar from './components/UpdateBar/UpdateBar';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';

class App extends PureComponent {

  handleLogOut = () => {

  }

  renderSite() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/top-movies" component={TopMovieList}/>
          <Route exact path="/profile" component={Profile} />
          <Route path="/movie" component={MoviePage} />
        </Switch>
      </div>
    )
  }

  renderRegisterLogin() {
    return (
      <RegisterLogin />
    )
  }

  render() {
    let whatToShow = '';
    if (this.props.isAuthenticated) {
      whatToShow = this.renderSite();
    } else {
      whatToShow = this.renderRegisterLogin();
    }

    return (
      <BrowserRouter>
        <div className="App">
          <Container className="px-0 border-0 app-container">
            <TopNav
              showNavItems={this.props.isAuthenticated}
              onLogOut={this.handleLogOut}
            />
            <UpdateBar/>
            { whatToShow }
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isAuthenicated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
})

export default connect(mapStateToProps)(App);
