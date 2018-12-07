//Navbar component
import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
  import { Link } from 'react-router-dom';

export default class Navigation extends Component {
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
        <Navbar className="navbar--color" expand="md">
          <NavbarBrand className="navbar__brand" tag={Link} to="/">Boardgame World</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="navbar__links--color" tag={Link} to="/login">Login</NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="navbar__links--color navbar__links--margin" tag={Link} to="/register">Register</NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="navbar__links--color" tag={Link} to="/cart">Cart</NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="navbar__links--color" tag={Link} to="/listing">Listing</NavLink>
              </NavItem>

              <NavItem>
                <NavLink className="navbar__links--color" tag={Link} to="/faq">FAQ</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}