import React, { Component, SyntheticEvent, ReactNode } from 'react';
import { Button } from 'reactstrap';
import _ from 'lodash';
import { Dispatch } from 'redux';

import { FirebaseAuth, FirebaseAuthTypes } from '../../Firebase';
import { User } from '../../Authentication';
const styles = require('../../../main/css/Admin.module.css');

interface Props {
  dispatch: Dispatch;
  allUsers: User[];
}

export default class UsersList extends Component<Props> {
  public users: ReactNode;
  public FbAuth: FirebaseAuthTypes = new FirebaseAuth({} as FirebaseAuthTypes);

  componentDidMount() {
    this.FbAuth.fetchAllUsers(this.props.dispatch);
  }

  // function that will delete user and fetch a new user list
  handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    const { dispatch } = this.props;
    const { userUid } = event.currentTarget.dataset;
    // dispatch<any>(deleteUser(userUid as string));
    this.FbAuth.deleteUser(userUid as string, dispatch);
  };

  renderUsers = () => {
    const { allUsers } = this.props;
    this.users = _.map(allUsers, (value, key) => {
      return (
        <div key={key} className={styles['user__listGroup']}>
          <div className={styles['user__listGroupText']}>{value.email}</div>
          <Button
            color='danger'
            outline
            className={styles['user__listGroupBtn']}
            onClick={this.handleClick}
            data-user-uid={value.uid}
          >
            Remove
          </Button>
        </div>
      );
    });
    if (!_.isEmpty(this.users)) {
      return this.users;
    }
    return null;
  };

  render() {
    return <div className={styles['user__wrapper']}>{this.renderUsers()}</div>;
  }
}
