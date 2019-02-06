// Navbar component
import React, { Component, ChangeEvent } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { updateSearchTerm } from '../index';
import { FirebaseAuth, FirebaseAuthTypes } from '../../Firebase';
import { User } from '../../Authentication';
import { ReduxState } from '../../../main';
const styles = require('../../../main/css/Header.module.css');

interface Props extends RouteComponentProps<any> {
  dispatch: Dispatch;
  user: User;
  term: string;
}

interface State {
  isOpen: boolean;
}

class Header extends Component<Props, State> {
  public FbAuth: FirebaseAuthTypes = new FirebaseAuth({});
  public unsubscribe: any;
  state = {
    isOpen: false
  };

  componentDidMount() {
    const { dispatch } = this.props;
    this.unsubscribe = this.FbAuth.userListener(dispatch);
  }

  componentWillUnmount() {
    // destroy listener for authentication
    this.unsubscribe();
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { dispatch } = this.props;
    // update redux store
    dispatch(updateSearchTerm(e.target.value));
  };

  handleSearchClick = (): void => {
    const { history } = this.props;
    history.push('/listing');
  };

  render() {
    const { user, term } = this.props;
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
                  {user ? user.email : 'Guest'}
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
                  value={term}
                  // go to /listing so user can see filtered items
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

export const HeaderConn = connect(
  (state: ReduxState) => {
    return {
      user: state.user[0],
      boardgames: state.boardgames[0],
      term: state.searchTerm
    };
  },
  (dispatch: Dispatch) => {
    return { dispatch };
  }
)(withRouter(Header));
