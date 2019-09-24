import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logoutUser } from '../redux/actions';
import logo from '../images/icons/logo_header.gif';

class TopNav extends PureComponent {

  handleLogout = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
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
          activeClassName="active"
        >
          <FontAwesomeIcon icon={["far", "user"]}/> { username }
        </NavLink>
        <NavLink
          onClick={ this.handleLogout }
          className="text-white mx-2"
          to="/"
        >
          | {"\u00a0"}<FontAwesomeIcon icon="sign-out-alt" /> LOGOUT
        </NavLink>
      </Nav>
    );

    const guestLinks = (
      <Nav className="login-register-links text-white">
        <NavLink
          className="text-white mx-2"
          to="/register"
          activeClassName="active"
        >
          REGISTER
        </NavLink>
        {' | '}
        <NavLink
          className="text-white mx-2"
          to="/login"
        >
          LOGIN
        </NavLink>
      </Nav>
    );

    return (
      <Navbar className="navbar mt-4">
        {update && this.showStatus()}
        {/****** Logo *****/}
        <Navbar.Brand className="brand">
          <NavLink
            style={{ textDecoration: 'none'}}
            to='/'
          >
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
              exact
              to="/"
              activeClassName="active"
            >
              HOME
            </NavLink>

            {/* <NavLink
              className="text-white mx-2 nav-block"
              exact
              to="/top-movies"
              activeClassName="active"
            >
              TOP MOVIE LIST
            </NavLink> */}

            <NavLink
              className="text-white mx-2 nav-block"
              exact
              to={ isAuthenticated ? "/profile" : "/login" }
              activeClassName={ isAuthenticated ? "active" : "" }
            >
              YOUR TOP LIST
            </NavLink>

            {/* <NavLink
              className="text-white mx-2 nav-block"
              exact
              to="/users-index"
              activeClassName="active"
            >
              USERS' INDEX
            </NavLink> */}

            {/* <NavLink
              className="text-white mx-2 nav-block"
              exact
              to="/all-movies"
              activeClassName="active"
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
  user: PropTypes.object,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNav));
