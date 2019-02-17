import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
// avoiding destructuring so I don't pull in the whole library and send signifcantly
// less code to the client
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
// import './TopNav.css';

const styles = {
  brand: {
    fontSize: '1.4rem'
  },
  navbar: {

  }
}

class TopNav extends React.Component {

  render() {

    return (
      <Navbar style={styles.navbar} bg="light" expand="lg">
        <Navbar.Brand  style={styles.brand} href="#home">
          YMDB: Your Movie Database
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link>
              <NavLink to="/">Top Movie List</NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink to="/profile">Your Top List</NavLink>
            </Nav.Link>

            <Nav.Link>
              <NavLink to="/register">Register</NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to="/login">Log In</NavLink>
            </Nav.Link>
            
            <Nav.Link> 
             <NavLink to="/profile">Profile</NavLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>



      // <div className="links">
      //   <div className='nav-links'>
      //     <NavLink to="/" className="navlink">Home</NavLink>
      //     <NavLink to="/register" className="navlink">Register</NavLink>
      //     <NavLink to="/login" className="navlink">Log In</NavLink>
      //     <NavLink to="/profile" className="navlink">{this.props.username}</NavLink>
      //   </div>
      // </div>
    )
  }
}

const mapStateToProps = state => ({
  username: state.username
});

export default connect(mapStateToProps)(TopNav)
