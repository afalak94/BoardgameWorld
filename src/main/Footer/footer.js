import React, { Component, Fragment } from 'react';
import { Navbar, Nav, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../firebase.config';
import 'firebase/auth';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUser } from '../../modules/Login/actions';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.returnAuth = this.returnAuth.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    let promise = new Promise(function(resolve, reject) {
      firebase.auth().signOut();
    });
    promise.then(this.props.addUser(null)).then(this.props.history.push('/'));
  }

  returnAuth() {
    if (this.props.user) {
      return (
        <div>
          <NavLink
            disabled={
              //check if admin is logged in
              this.props.user.uid === '6qXBbupnZsQkpp5vj5ZmteGF1qs1'
                ? false
                : true
            }
            className='navbar__links--color'
            tag={Link}
            to='/admin'
          >
            Admin section
          </NavLink>

          <NavLink className='footer__user' onClick={this.logout}>
            Log out
          </NavLink>
        </div>
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

function mapStateToProps(state) {
  return {
    user: state.user[0]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    ...bindActionCreators({ addUser }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(withRouter(Footer));
