import React, { Component, Fragment, ReactNode } from 'react';
import { Navbar, Nav, NavLink } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { FirebaseAuth, FirebaseAuthTypes } from '../../Firebase';
import { User } from '../..//Authentication';
import { ReduxState } from '../../../main';
const styles = require('../../../main/css/Footer.module.css');

interface Props {
  history: {};
  dispatch: Dispatch;
  user: User;
}

class Footer extends Component<Props> {
  public FbAuth: FirebaseAuthTypes = new FirebaseAuth({});

  handleClick = (): void => {
    const { dispatch, history } = this.props;
    this.FbAuth.logoutUser(dispatch, history);
  };

  returnAuth = (): ReactNode => {
    const { user } = this.props;
    if (user && user.uid !== 'guest') {
      return (
        <div>
          <NavLink
            disabled={
              // check if admin is logged in
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

const mapStateToProps = (state: ReduxState) => {
  return {
    user: state.user[0]
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return { dispatch };
};

export const FooterConn = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Footer as any));
