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
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateSearchTerm } from '../index';
import { bindActionCreators } from 'redux';
import styles from '../../../main/css/Header.module.css';
import { addUser } from '../../Authentication';
import { FirebaseAuth } from '../../Firebase';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    //firebase authentication object
    this.FbAuth = new FirebaseAuth();
  }

  componentDidMount() {
    this.unsubscribe = this.FbAuth.userListener(this.props.dispatch);
  }

  componentWillUnmount() {
    //destroy listener for authentication
    this.unsubscribe();
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleChange = e => {
    const { dispatch } = this.props;
    //update redux store
    dispatch(updateSearchTerm(e.target.value));
  };

  handleSearchClick = () => {
    const { history } = this.props;
    history.push('/listing');
  };

  render() {
    return (
      <div>
        <Navbar className={styles['navbar--color']} expand='md'>
          <NavbarBrand className={styles['navbar__brand']} tag={Link} to='/'>
            Boardgame World
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem className={styles['navbar__userListEl']}>
                <div className={styles['navbar__user']} id='logged-user'>
                  {this.props.user ? this.props.user.email : 'Guest'}
                </div>
              </NavItem>

              <NavItem className={styles['navbar__search']}>
                <input
                  id='searchBar'
                  className='form-control mr-sm-2'
                  type='search'
                  placeholder='Search'
                  aria-label='Search'
                  onChange={this.handleChange}
                  value={this.props.term}
                  //go to /listing so user can see filtered items
                  onClick={this.handleSearchClick}
                />
              </NavItem>

              <NavItem>
                <NavLink
                  className={styles['navbar__links--color']}
                  tag={Link}
                  to='/cart'
                >
                  Cart
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={styles['navbar__links--color']}
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

function mapDispatchtoProps(dispatch) {
  return {
    ...bindActionCreators({ addUser, updateSearchTerm }),
    dispatch
  };
}

export const HeaderConn = connect(
  // mapStateToProps,
  state => {
    return {
      user: state.user[0],
      boardgames: state.boardgames[0],
      term: state.searchTerm
    };
  },
  mapDispatchtoProps
)(withRouter(Header));
