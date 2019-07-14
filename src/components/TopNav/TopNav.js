import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavLink from 'react-router-dom/NavLink';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logoutUser } from '../../redux/actions';

import './TopNav.css';

class TopNav extends React.PureComponent {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  // showStatus() {
  //   return
  // }

  render() {
    const { isAuthenticated, showNavItems } = this.props;

    const authLinks = (
      <Nav className="login-register-links p-0">
        <Nav.Link onClick={this.onLogoutClick}>
          <NavLink className="text-white" to="/">LOGOUT</NavLink>
        </Nav.Link>
      </Nav>
    )

    const guestLinks = (
      <Nav className="login-register-links text-white">
        <Nav.Link>
          <NavLink className="text-white" to="/login">LOGIN</NavLink>
        </Nav.Link>
        <Nav.Link>
          <NavLink className="text-white" to="/register">REGISTER</NavLink>
        </Nav.Link>
      </Nav>

    )

    return (
      <Navbar className="navbar mt-4">
        {this.props.update && this.showStatus()}
        {/****** Logo *****/}
        <Navbar.Brand className="brand">
          <NavLink style={{ textDecoration: 'none'}} to={isAuthenticated ? '/' : '/login'}>
            <div className="site-title m-0 p-0 ml-4">YMDB</div>
            <div className="subtitle m-0 p-0 ml-4">Your Movie Database</div>
          </NavLink>
        </Navbar.Brand>
        {/****** End Logo *****/}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          { showNavItems &&
            <Nav className="d-flex flex-column ml-auto">

              <div className="ml-auto">
                { isAuthenticated ? authLinks : guestLinks }
              </div>

             <div className="main-links d-flex">
                <Nav.Link>
                  <NavLink className="text-white" to="/top-movies">Top Movie List</NavLink>
                </Nav.Link>
                <Nav.Link>
                  <NavLink className="text-white" to="/profile">Your Top List</NavLink>
                </Nav.Link>
             </div>
            </Nav>
          }
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
