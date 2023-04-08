import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Routes, withRouter } from 'react-router-dom';
import TopNav from './components/TopNav';
import MovieSearch from './components/MovieSearch';
import Home from './components/Home';
import Profile from './components/Profile';
import TopMoviesList from './components/TopMoviesList';
import MoviePage from './components/MoviePage/MoviePage';
import MessageBar from './components/MessageBar';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import UsersIndex from './components/UsersIndex';
import NewRegisters from './components/NewRegisters';
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
      <div id='app'>
        <div className='container-scss mt-2 px-0 border-0'>
          <TopNav />
          <MessageBar />
          <MovieSearch />
          <Routes>
            <Route path='/' element={Home} />
            <Route path='/login' element={Login} />
            <Route path='/register' element={Register} />
            <Route path='/account' element={Account} />
            <Route path='/top-movies' element={TopMoviesList} />
            <Route path='/profile' element={Profile} />
            {/* <Route path="/profile/edit=:edit/:username" element={ Profile } /> */}
            {/* render conditionally only if user is found, else 404 page */}
            <Route path='/profile/:username' element={Profile} />
            <Route path='/users-index' element={UsersIndex} />
            <Route path='/all-movies' element={UnderConstruction} />
            <Route path='/most-visited' element={UnderConstruction} />
            <Route path='/reviews' element={UnderConstruction} />
            <Route path='/new-registers' element={NewRegisters} />
            <Route path='/movies' element={MoviePage} />
            <Route render={this.pageNotFound} />
          </Routes>
          <Footer />
        </div>
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
