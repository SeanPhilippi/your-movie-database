import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import { Container } from 'reactstrap';
import TopNav from './components/TopNav/TopNav';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import TopMovieList from './components/TopMovieList/TopMovieList';
import MoviePage from './components/MoviePage/MoviePage';
import UpdateBar from './components/UpdateBar/UpdateBar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Account from './components/Account/Account';
import UsersIndex from './components/UsersIndex/UsersIndex';
import PageNotFound from './components/PageNotFound/PageNotFound';
import UnderConstruction from './components/UnderConstruction/UnderConstruction';
import axios from 'axios';
import {
  setCurrentUser,
  setNewUsers,
  fetchList,
} from './redux/actions';
import http from './utils/http';
import './App.css';

class App extends PureComponent {
  componentDidMount() {
    http.users.get.newRegisters()
      .then(({ data }) => {
        this.props.setNewUsers(data);
      })
      .catch(console.log);
  }

  pageNotFound = () => <PageNotFound />;

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Container className="px-0 border-0 app-container">
            <TopNav/>
            <UpdateBar/>
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/account" component={ UnderConstruction } />
              <Route exact path="/top-movies" component={ UnderConstruction } />
              <Route exact path="/profile" component={ Profile } />
              <Route path="/users-index" component={ UnderConstruction } />
              <Route path="/users-index" component={ UnderConstruction } />
              <Route path="/all-movies" component={ UnderConstruction } />
              <Route render={ this.pageNotFound } />
            </Switch>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isAuthenicated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = {
  setCurrentUser,
  setNewUsers,
  fetchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
