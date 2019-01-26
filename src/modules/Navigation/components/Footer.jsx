import React, { Component, Fragment } from 'react';
import { Navbar, Nav, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FirebaseAuth } from '../../Firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from '../../../main/css/Footer.module.css';

class Footer extends Component {
  handleClick = () => {
    const { dispatch, history } = this.props;
    this.FbAuth.logoutUser(dispatch, history);
  };

  returnAuth = () => {
    const { user } = this.props;
    if (user && user.uid !== 'guest') {
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

          <NavLink
            className={styles['footer__user']}
            onClick={this.handleClick}
          >
            Log out
          </NavLink>
        </div>
      );
    }
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
  };

  render() {
    //firebase authentication object
    this.FbAuth = new FirebaseAuth();

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

export const FooterConn = connect(
  state => {
    return {
      user: state.user[0]
    };
  },
  dispatch => {
    return { dispatch };
  }
)(withRouter(Footer));
