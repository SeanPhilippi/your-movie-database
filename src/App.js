import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import TopNav from './components/TopNav';
import MovieSearch from './components/MovieSearch';
import Home from './components/Home';
import Profile from './components/Profile';
import TopMoviesList from './components/TopMoviesList';
import MoviePage from './components/MoviePage/MoviePage';
import MessageBar from './components/MessageBar';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Login from './components/Login';
import Settings from './components/Settings/Settings';
import Unsubscribe from './components/Unsubscribe';
import UsersIndex from './components/UsersIndex';
import NewRegisters from './components/NewRegisters';
import MostVisitedPage from './components/MostVisitedPage';
import PageNotFound from './components/PageNotFound';
import UnderConstruction from './components/UnderConstruction';
import Footer from './components/Footer';
import { setNewUsers, clearErrors, setCurrentPage } from './redux/actions';
import api from './utils/api/api';

class App extends PureComponent {
  componentDidMount() {
    api.users.get
      .newRegisters()
      .then(({ data }) => {
        this.props.setNewUsers(data);
      })
      .catch(console.log);
    this.unlisten = this.props.history.listen((location, action) => {
      this.props.clearErrors();
      this.props.setCurrentPage(1);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  pageNotFound = () => <PageNotFound />;

  render() {
    return (
      <div id='app' className='container-scss mt-2 px-0 border-0'>
        <TopNav />
        <MessageBar />
        <MovieSearch />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route exact path='/reset-password/:token' component={ResetPassword} />
          <Redirect exact from='/account' to='/settings' />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/unsubscribe/:token' component={Unsubscribe} />
          <Route exact path='/top-movies' component={TopMoviesList} />
          <Route exact path='/profile' component={Profile} />
          {/* <Route exact path="/profile/edit=:edit/:username" component={ Profile } /> */}
          {/* render conditionally only if user is found, else 404 page */}
          <Route exact path='/profile/:username' component={Profile} />
          <Route exact path='/users-index' component={UsersIndex} />
          <Route exact path='/all-movies' component={UnderConstruction} />
          <Route exact path='/most-visited' component={MostVisitedPage} />
          <Route exact path='/reviews' component={UnderConstruction} />
          <Route exact path='/new-registers' component={NewRegisters} />
          <Route path='/movies' component={MoviePage} />
          <Route render={this.pageNotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  isAuthenicated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  setNewUsers: users => dispatch(setNewUsers(users)),
  clearErrors: () => dispatch(clearErrors()),
  setCurrentPage: num => dispatch(setCurrentPage(num)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
