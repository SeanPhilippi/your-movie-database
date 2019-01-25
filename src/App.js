import React, { Component } from 'react';
import './index.css';
import TopNav from './components/TopNav';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
// import react router
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div className="container">
          <TopNav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
