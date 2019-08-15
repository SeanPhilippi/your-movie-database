import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { logoutUser } from '../../redux/actions';
import logo from '../../images/icons/logo_header.gif';


import './TopNav.css';

class TopNav extends PureComponent {

  handleLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  handleLogin = () => { };

  render() {
    const {
      isAuthenticated,
      user: {
        username
      },
      update,
    } = this.props;

    const authLinks = (
      <Nav className="login-register-links p-0">
        <NavLink
          className="text-white font-weight-bold"
          to="/account"
        >
          { username }
        </NavLink>
        <NavLink
          onClick={this.handleLogout}
          className="text-white mx-2"
          to="/"
        >
          | {"\u00a0"}LOGOUT
        </NavLink>
      </Nav>
    );

    const guestLinks = (
      <Nav className="login-register-links text-white">
        <NavLink className="text-white mx-2" to="/register">
          REGISTER
        </NavLink>
        {' | '}
        <NavLink className="text-white mx-2" to="/login">
          LOGIN
        </NavLink>
      </Nav>
    );

    return (
      <Navbar className="navbar mt-4">
        {update && this.showStatus()}
        {/****** Logo *****/}
        <Navbar.Brand className="brand">
          <NavLink style={{ textDecoration: 'none'}} to='/'>
            <div className="site-title m-0 p-0 ml-4">
              YMDB
            </div>
            <div className="subtitle m-0 p-0 ml-4">
              Your Movie Database
            </div>
          </NavLink>
        </Navbar.Brand>
        {/****** End Logo *****/}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex flex-column ml-auto">

            <div className="ml-auto">
              { isAuthenticated ? authLinks : guestLinks }
            </div>

          <div className="main-links d-flex justify-content-end">
            <NavLink
              className="text-white mx-2 nav-block"
              to="/"
            >
              HOME
            </NavLink>
            {/* <NavLink
              className="text-white mx-2 nav-block"
              to="/top-movies"
            >
              TOP MOVIE LIST
            </NavLink> */}
            <NavLink
              className="text-white mx-2 nav-block"
              to={ isAuthenticated ? "/profile" : "/login"}
            >
              YOUR TOP LIST
            </NavLink>
            {/* <NavLink
              className="text-white mx-2 nav-block"
              to="/users-index"
            >
              USERS' INDEX
            </NavLink> */}
            {/* <NavLink
              className="text-white mx-2 nav-block"
              to="/all-movies"
            >
              ALL THE MOVIES
            </NavLink> */}
          </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

TopNav.propTypes = {
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: history => dispatch(logoutUser(history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
