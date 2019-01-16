import React, { Component, Fragment } from 'react';
import { Navbar, Nav, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FirebaseAuth } from '../../Firebase';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from '../../../main/css/Footer.module.css';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.returnAuth = this.returnAuth.bind(this);

    //firebase authentication object
    this.FbAuth = new FirebaseAuth();
  }

  handleClick = () => {
    this.FbAuth.logoutUser(this.props.dispatch, this.props.history);
  };

  returnAuth() {
    if (this.props.user && this.props.user.uid !== 'guest') {
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
