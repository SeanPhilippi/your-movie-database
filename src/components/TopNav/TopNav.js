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

class TopNav extends React.Component {
// ! split into auth and guest links
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  showStatus() {
    return 
  }

  render() {
    const { loggedIn, showNavItems } = this.props;

    return (
      <Navbar style={styles.navbar} bg="light" expand="lg">
        {this.props.update && this.showStatus()}
        <Navbar.Brand style={styles.brand} >
          <NavLink to={loggedIn ? '/' : '/login'}>
            YMDB: Your Movie Database
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {showNavItems &&
            <Nav className="ml-auto" style={styles.navbar}>
              <Nav.Link>
                <NavLink to="/top-movies">Top Movie List</NavLink>
              </Nav.Link>

              <Nav.Link>
                <NavLink to="/profile">Your Top List</NavLink>
              </Nav.Link>
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
  username: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.isAuthenticated,
  username: state.username,
  loggedIn: state.loggedIn,
  logoutUser: state.logoutUser,
  showNavItems: state.showNavItems
});

export default connect(mapStateToProps, { logoutUser })(TopNav)
