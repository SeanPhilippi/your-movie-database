import React, { Component } from 'react';
import './index.css';
import RegisterLogin from './components/RegisterLogin/RegisterLogin';
import TopNav from './components/TopNav/TopNav';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import TopMovieList from './components/TopMovieList/TopMovieList';
import MoviePage from './components/MoviePage/MoviePage';
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {

  state = {
    // authenticated: localStorage.getItem('token') || false, //* put this in redux global state?
    authenticated: true
  }

  handleLogOut = () => {

  }

  renderSite() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
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
    if (this.state.authenticated) {
      whatToShow = this.renderSite();
    } else {
      whatToShow = this.renderRegisterLogin();
    }

    return (
      <BrowserRouter>
        <div className="App">
          <TopNav 
            showNavItems={this.state.authenticated}
            onLogOut={this.handleLogOut}
          />
          { whatToShow }
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
