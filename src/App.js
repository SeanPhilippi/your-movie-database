import React, { Component } from 'react';
import './index.css';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import MoviePage from './components/MoviePage/MoviePage';
// import react router
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

class App extends Component {

  render() {
    const { loggedIn } = this.props;

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/home" render={() => (
              loggedIn ? (
                <Redirect to="/home" />
              ) : (
                  <Login />
                )
            )} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile}
              render={() => (
                loggedIn ? (
                  <Redirect to="/profile" />
                ) : (
                    <Login />
                  )
              )}
            />
            <Route path="/movie" component={MoviePage} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn,
})

export default connect(mapStateToProps)(App);
