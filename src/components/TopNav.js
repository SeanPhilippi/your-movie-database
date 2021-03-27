import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logoutUser } from '../redux/actions';

const TopNav = ({
  history,
  logoutUser,
  isAuthenticated,
  user: {
    username,
  },
}) => {
  const handleLogout = e => {
    e.preventDefault();
    logoutUser(history);
  };

  const yourTopListActive = () => {
    const path = history.location.pathname;
    return (
      isAuthenticated &&
      (path === '/profile' || path === `/profile/${username}`)
    );
  };

  const authLinks = (
    <Nav className='login-register-links p-0'>
      <NavLink
        className='text-white font-weight-bold'
        to='/account'
        activeClassName='active'
      >
        <FontAwesomeIcon icon={['far', 'user']} /> {username}
      </NavLink>
      <NavLink onClick={handleLogout} className='text-white mx-2' to='/'>
        | {'\u00a0'}
        <FontAwesomeIcon icon='sign-out-alt' /> LOGOUT
      </NavLink>
    </Nav>
  );

  const guestLinks = (
    <Nav className='login-register-links text-white'>
      <NavLink
        className='text-white mx-2'
        to='/register'
        activeClassName='active'
      >
        REGISTER
      </NavLink>
      {' | '}
      <NavLink className='text-white mx-2' to='/login'>
        LOGIN
      </NavLink>
    </Nav>
  );

  return (
    <Navbar className='navbar'>
      {/****** Logo *****/}
      <Navbar.Brand className='brand'>
        <NavLink style={{ textDecoration: 'none' }} to='/'>
          <div className='site-title m-0 p-0 ml-4'>YMDB</div>
          <div className='subtitle m-0 p-0 ml-4'>Your Movie Database</div>
        </NavLink>
      </Navbar.Brand>
      {/****** End Logo *****/}
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='d-flex flex-column ml-auto'>
          <div className='ml-auto'>
            {isAuthenticated ? authLinks : guestLinks}
          </div>

          <div className='main-links d-flex flex-sm-row flex-column justify-content-end'>
            <NavLink
              className='text-white nav-block'
              exact
              to='/'
              activeClassName='active'
            >
              HOME
            </NavLink>

            <NavLink
              className='text-white nav-block'
              exact
              to='/top-movies'
              activeClassName='active'
            >
              TOP MOVIES
            </NavLink>

            <NavLink
              className='text-white nav-block'
              to={isAuthenticated ? '/profile' : '/login'}
              isActive={yourTopListActive}
            >
              YOUR TOP LIST
            </NavLink>

            {/* <NavLink
            className="text-white nav-block"
            exact
            to="/users-index"
            activeClassName="active"
          >
            USERS' INDEX
          </NavLink> */}

            {/* <NavLink
            className="text-white nav-block"
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
  );
}

TopNav.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    statement: PropTypes.string,
    items: PropTypes.array,
  }).isRequired,
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
