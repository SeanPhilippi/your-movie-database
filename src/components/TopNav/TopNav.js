import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavLink from 'react-router-dom/NavLink';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { logoutUser } from '../../redux/actions';
// import './TopNav.css';

const styles = {
  brand: {
    fontSize: '1.4rem'
  },
  navbar: {
    flex: 1,
    justifyContent: 'flex-end'
  }
}

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
      <Nav>
        <Nav.Link onClick={this.onLogoutClick}>
          <NavLink to="/">Logout</NavLink>
        </Nav.Link>
      </Nav>
    )

    const guestLinks = (
      <Nav>
        <Nav.Link>
          <NavLink to="/login">Login</NavLink>
        </Nav.Link>
        <Nav.Link>
          <NavLink to="/register">Register</NavLink>
        </Nav.Link>
      </Nav>
      
    )

    return (
      <Navbar style={styles.navbar} bg="light" expand="lg">
        {this.props.update && this.showStatus()}
        <Navbar.Brand style={styles.brand} >
          <NavLink to={isAuthenticated ? '/' : '/login'}>
            YMDB: Your Movie Database
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          { showNavItems &&
            <Nav className="ml-auto" style={styles.navbar}>
              <Nav.Link>
                <NavLink to="/top-movies">Top Movie List</NavLink>
              </Nav.Link>

              <Nav.Link>
                <NavLink to="/profile">Your Top List</NavLink>
              </Nav.Link>

              { isAuthenticated ? authLinks : guestLinks }
            </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

TopNav.propTypes = {
  username: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  username: state.username,
  logoutUser: state.logoutUser,
  showNavItems: state.showNavItems
});

export default connect(mapStateToProps, { logoutUser })(TopNav)
