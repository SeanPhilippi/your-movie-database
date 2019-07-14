import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavLink from 'react-router-dom/NavLink';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logoutUser } from '../../redux/actions';

import './TopNav.css';

class TopNav extends React.PureComponent {

  handleLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  // showStatus() {
  //   return
  // }

  render() {
    const { isAuthenticated, showNavItems, user } = this.props;

    const authLinks = (
      <Nav className="login-register-links p-0">
        <NavLink
          className="text-white"
          to="/settings"
        >
          {/* { user.name } */}
        </NavLink>
        <NavLink
          onClick={this.handleLogout}
          className="text-white"
          to="/"
        >
          LOGOUT
        </NavLink>
      </Nav>
    )

    const guestLinks = (
      <Nav className="login-register-links text-white">
        <NavLink className="text-white mx-2" to="/register">REGISTER</NavLink> |
        <NavLink className="text-white mx-2" to="/login">LOGIN</NavLink>
      </Nav>

    )

    return (
      <Navbar className="navbar mt-4">
        {this.props.update && this.showStatus()}
        {/****** Logo *****/}
        <Navbar.Brand className="brand">
          <NavLink style={{ textDecoration: 'none'}} to='/'>
            <div className="site-title m-0 p-0 ml-4">YMDB</div>
            <div className="subtitle m-0 p-0 ml-4">Your Movie Database</div>
          </NavLink>
        </Navbar.Brand>
        {/****** End Logo *****/}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex flex-column ml-auto">

            <div className="ml-auto">
              { isAuthenticated ? authLinks : guestLinks }
            </div>

          <div className="main-links d-flex">
            <NavLink className="text-white mx-2" to="/top-movies">Top Movie List</NavLink>
            <NavLink className="text-white mx-2" to="/profile">Your Top List</NavLink>
          </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

TopNav.propTypes = {
  username: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  username: state.username,
  logoutUser: state.logoutUser,
  showNavItems: state.showNavItems
});

export default connect(mapStateToProps, { logoutUser })(TopNav)
