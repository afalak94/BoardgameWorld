import React, { Component, Fragment } from 'react';
import { Navbar, Nav, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../firebase.config';
import 'firebase/auth';

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.authListener = this.authListener.bind(this);
    this.returnAuth = this.returnAuth.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      user: {}
    };
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

  logout() {
    firebase.auth().signOut();
  }

  returnAuth() {
    if (this.state.user) {
      return (
        <NavLink className='footer__user' onClick={this.logout}>
          Log out
        </NavLink>
      );
    } else {
      return (
        <Fragment>
          <NavLink className='navbar__links--color' tag={Link} to='/login'>
            Login
          </NavLink>
          <NavLink
            className='navbar__links--color navbar__links--margin'
            tag={Link}
            to='/register'
          >
            Register
          </NavLink>
        </Fragment>
      );
    }
  }

  render() {
    return (
      <div className='footer'>
        <Navbar expand='md'>
          <div>
            <Nav vertical className='footer__links'>
              <NavLink className='navbar__links--color' tag={Link} to='/admin'>
                Admin section
              </NavLink>{' '}
              {this.returnAuth()}
              <NavLink className='navbar__links--color' tag={Link} to='/faq'>
                FAQ
              </NavLink>{' '}
            </Nav>
          </div>
        </Navbar>
      </div>
    );
  }
}
