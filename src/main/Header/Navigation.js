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
import { connect } from 'react-redux';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
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
                <div className='navbar__user' id='logged-user'>
                  {this.props.user ? this.props.user.email : 'Anonymous'}
                </div>
              </NavItem>

              <NavItem>
                <input
                  class='form-control mr-sm-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                />
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

function mapStateToProps(state) {
  return {
    user: state.user[0]
  };
}

export default connect(
  mapStateToProps,
  null
)(Navigation);
