import React, { Component } from 'react';
import './App.css';
import TopNav from './components/TopNav';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
// import react router
import {
  Route,
  Switch,
  BrowserRouter
} from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div className="container">
          <TopNav />
          <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/register" component={Register} />
            <Route exact={true} path="/profile" component={Profile} />
          </Switch>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
