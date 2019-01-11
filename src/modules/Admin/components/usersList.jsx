import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import styles from '../../../main/css/Admin.module.css';

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = { userList: [] };
  }

  componentDidMount() {
    //getting the list of all users
    axios
      .get(
        `https://us-central1-react-store-3406f.cloudfunctions.net/getAllUsers`
      )
      .then(res => {
        //console.log(res.data);
        this.setState({ userList: res.data });
      });
  }

  //function that will delete user and fetch a new user list
  deleteUser = event => {
    const { userUid } = event.target.dataset;
    axios
      .get(
        `https://us-central1-react-store-3406f.cloudfunctions.net/deleteUser?text=` +
          userUid,
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then(res => {
        //console.log(res);
        this.componentDidMount();
      });
  };

  render() {
    return (
      <div className={styles['user__wrapper']}>
        {this.state.userList.map(user => {
          return (
            <div key={user.uid} className={styles['user__listGroup']}>
              <div className={styles['user__listGroupText']}>{user.email}</div>
              <Button
                color='danger'
                outline
                className={styles['user__listGroupBtn']}
                onClick={this.deleteUser}
                data-user-uid={user.uid}
              >
                Remove
              </Button>
            </div>
          );
        })}
      </div>
    );
  }
}
