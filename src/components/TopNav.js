import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class TopNav extends React.Component {

  render() {

    return (
      <div className="links">
        <div className='nav-links'>
          <NavLink to="/" className="navlink">Home</NavLink>
          <NavLink to="/register" className="navlink">Register</NavLink>
          <NavLink to="/login" className="navlink">Log In</NavLink>
          <NavLink to="/profile" className="navlink">{this.props.username}</NavLink>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.username
});

export default connect(mapStateToProps)(TopNav)
