import React, { Component, Fragment } from 'react';
import { Navbar, Nav, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from '../../Firebase/firebase.config';
import 'firebase/auth';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUser } from '../../Authentication/redux/actions';
import styles from '../../../main/css/Footer.module.css';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.returnAuth = this.returnAuth.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    //delete user data from redux store and redirect to Home
    let promise = new Promise(() => {
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
            className={styles['footer__links--color']}
            tag={Link}
            to='/admin'
          >
            Admin section
          </NavLink>

          <NavLink className={styles['footer__user']} onClick={this.logout}>
            Log out
          </NavLink>
        </div>
      );
    } else {
      return (
        <Fragment>
          <NavLink
            className={styles['footer__links--color']}
            tag={Link}
            to='/login'
          >
            Login
          </NavLink>
          <NavLink
            className={styles['footer__links--color']}
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
      <div className={styles['footer']}>
        <Navbar expand='md'>
          <div>
            <Nav vertical className={styles['footer__links']}>
              {this.returnAuth()}
              <NavLink
                className={styles['footer__links--color']}
                tag={Link}
                to='/faq'
              >
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

export const FooterConn = connect(
  mapStateToProps,
  mapDispatchtoProps
)(withRouter(Footer));
