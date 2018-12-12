import React from 'react';
import { Navbar, Nav, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Footer extends React.Component {
  render() {
    return (
      <div className='footer'>
        <Navbar expand='md'>
          <div>
            <Nav vertical className='footer__links'>
              <NavLink className='navbar__links--color' tag={Link} to='/admin'>
                Admin section
              </NavLink>{' '}
              <NavLink className='navbar__links--color' tag={Link} to='/login'>
                Login
              </NavLink>{' '}
              <NavLink
                className='navbar__links--color navbar__links--margin'
                tag={Link}
                to='/register'
              >
                Register
              </NavLink>{' '}
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
