import React, { Component } from 'react';
import './index.css';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import TopMovieList from './components/TopMovieList/TopMovieList';
import MoviePage from './components/MoviePage/MoviePage';
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {

  render() {

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/top-movies" component={TopMovieList}/>
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/movie" component={MoviePage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
