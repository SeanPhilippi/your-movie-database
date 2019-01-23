import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class TopNav extends React.Component {

  render() {

    return (
      <div className="links">
        <Link to="/" className="link">Home</Link>
        <Link to="/register" className="link">Register</Link>
        <Link to="/signin" className="link">Sign In</Link>
        <Link to="/profile" className="link">{this.props.username}</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.username
});

export default connect(mapStateToProps)(TopNav);