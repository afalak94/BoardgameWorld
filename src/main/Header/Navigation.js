//Navbar component
import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../firebase.config';
import 'firebase/auth';

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.authListener = this.authListener.bind(this);
    this.state = {
      isOpen: false,
      user: {}
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    this.authListener();
  }

  //listener for user authentication
  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      //console.log(user);
      if (user) {
        // User is signed in.
        this.setState({ user });
      } else {
        //console.log(user);
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div>
        <Navbar className='navbar--color' expand='md'>
          <NavbarBrand className='navbar__brand' tag={Link} to='/'>
            Boardgame World
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem className='navbar__userListEl'>
                <div className='navbar__user'>
                  {this.state.user ? this.state.user.email : 'Anonymous'}
                </div>
              </NavItem>

              <NavItem>
                <NavLink className='navbar__links--color' tag={Link} to='/cart'>
                  Cart
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className='navbar__links--color'
                  tag={Link}
                  to='/listing'
                >
                  Listing
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
