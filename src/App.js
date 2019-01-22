import React, { Component } from 'react';
import './App.css';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div className="App" >
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/" component={} />
          </Switch>
        </div >
      </BrowserRouter>
    );
  }
}

export default App;
