import React, { Component } from 'react';
import { Button } from 'reactstrap';
import _ from 'lodash';
import { fetchUsers, deleteUser } from '../../Firebase';
import styles from '../../../main/css/Admin.module.css';

export default class UsersList extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }

  //function that will delete user and fetch a new user list
  handleClick = event => {
    const { dispatch } = this.props;
    const { userUid } = event.target.dataset;
    dispatch(deleteUser(userUid, dispatch));
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
  };

  render() {
    return <div className={styles['user__wrapper']}>{this.renderUsers()}</div>;
  }
}
