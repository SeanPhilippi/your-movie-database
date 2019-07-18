import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import TopNav from './components/TopNav/TopNav';
import Home from './components/Home/Home';
import { Container } from 'reactstrap';
import Profile from './components/Profile/Profile';
import TopMovieList from './components/TopMovieList/TopMovieList';
import MoviePage from './components/MoviePage/MoviePage';
import UpdateBar from './components/UpdateBar/UpdateBar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Account from './components/Account/Account';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from 'axios';
import { setCurrentUser, setNewUsers } from './redux/actions';

import './App.css';

class App extends PureComponent {

  componentDidMount() {
    axios('api/users/new-registers')
      .then(users => {
        this.props.setNewUsers(users.data);
      })
      .catch(err => console.log(err));
      console.log('here')
    axios('api/users/current')
      .then(user => {
        console.log('here2')
        this.props.setCurrentUser(user);
      })
      .catch(err => console.log(err));
    }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Container className="px-0 border-0 app-container">
            <TopNav/>
            <UpdateBar/>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/top-movies" component={TopMovieList} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/movie" component={MoviePage} />
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isAuthenicated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
})

export default connect(mapStateToProps, { setCurrentUser, setNewUsers })(App);
