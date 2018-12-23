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
import styles from './Navigation.module.css';
import { addUser } from '../Login/actions';
import firebase from '../../main/firebase.config';
import 'firebase/auth';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendFilter = this.sendFilter.bind(this);
    this.authListener = this.authListener.bind(this);
    this.state = {
      isOpen: false,
      searchTerm: ''
    };
  }

  componentDidMount() {
    this.authListener();
  }

  componentDidUpdate(prevProps) {
    //clear search bar text on route change
    if (this.props.location !== prevProps.location) {
      this.setState({ searchTerm: '' });
    }
  }

  authListener() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // this.setState(() => {
        //   return { user };
        // });
        this.props.addUser(user);
      } else {
        // this.setState({ user: null });
      }
      // console.log(this.props.user);
    });
  }

  componentWillUnmount() {
    //destroy listener for authentication
    this.unsubscribe();
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
        <Navbar className={styles['navbar--color']} expand='md'>
          <NavbarBrand className={styles['navbar__brand']} tag={Link} to='/'>
            Boardgame World
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className='ml-auto' navbar>
              <NavItem className={styles['navbar__userListEl']}>
                <div className={styles['navbar__user']} id='logged-user'>
                  {this.props.user ? this.props.user.email : 'Anonymous'}
                </div>
              </NavItem>

              <NavItem className={styles['navbar__search']}>
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

function mapStateToProps(state) {
  return {
    user: state.user[0],
    boardgames: state.boardgames[0]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    ...bindActionCreators({ onNameFilter, addUser }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(withRouter(Navigation));
