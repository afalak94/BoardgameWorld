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
import { onNameFilter } from './actions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendFilter = this.sendFilter.bind(this);
    this.state = {
      isOpen: false,
      searchTerm: ''
    };
  }

  componentDidUpdate(prevProps) {
    //clear search bar text on route change
    if (this.props.location !== prevProps.location) {
      this.setState({ searchTerm: '' });
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleChange(e) {
    //call sendFilter function in the callback after state has been updated
    this.setState({ searchTerm: e.target.value }, this.sendFilter);
  }

  sendFilter() {
    this.props.onNameFilter(this.state.searchTerm);
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
                  id='searchBar'
                  className='form-control mr-sm-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                  onChange={e => this.handleChange(e)}
                  value={this.state.searchTerm}
                  //go to /listing so user can see filtered items
                  onClick={() => this.props.history.push('/listing')}
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
    user: state.user[0],
    boardgames: state.boardgames[0]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    ...bindActionCreators({ onNameFilter }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(withRouter(Navigation));
