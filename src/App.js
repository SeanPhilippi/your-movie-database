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
import NewRegisters from './components/NewRegisters/NewRegisters';
import PageNotFound from './components/PageNotFound/PageNotFound';
import UnderConstruction from './components/UnderConstruction/UnderConstruction';
import {
  setNewUsers,
  fetchList,
} from './redux/actions';
import http from './utils/http';
import './App.css';

class App extends PureComponent {
  componentDidMount() {
    http.users.get.newRegisters()
      .then(({ data }) => {
        this.props.setNewUsers(data.reverse());
      })
      .catch(console.log);
  }

  pageNotFound = () => <PageNotFound />;

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Container className="container-scss px-0 border-0">
            <TopNav/>
            <UpdateBar/>
            <Switch>
              <Route exact path="/" component={ Home } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/account" component={ Account } />
              <Route exact path="/top-movies" component={ UnderConstruction } />
              <Route exact path="/profile" component={ Profile } />
              {/* render conditionally only if user is found, else 404 page */}
              <Route exact path="/profile/:username" component={ Profile } />
              <Route exact path="/users-index" component={ UnderConstruction } />
              <Route exact path="/all-movies" component={ UnderConstruction } />
              <Route exact path="/new-users" component={ UnderConstruction } />
              <Route exact path="/most-visited" component={ UnderConstruction } />
              <Route exact path="/new-registers" component={ NewRegisters } />
              <Route path="/movies" component={ MoviePage } />
              {/* <Route path="/movies/:slug" component={ MoviePage } /> */}
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
  setNewUsers,
  fetchList,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
