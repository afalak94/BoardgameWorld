import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import axios from 'axios';
import styles from './Admin.module.css';

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.deleteUser = this.deleteUser.bind(this);
    this.state = { userList: [] };
  }

  componentDidMount() {
    //getting only one user by users uid
    // const UserUid = 'wWyrrZSZiKR5KikWwmkpYfbRJXn1';
    // axios
    //   .get(
    //     `https://us-central1-react-store-3406f.cloudfunctions.net/getUserByUid?text=` +
    //       UserUid,
    //     {
    //       headers: {
    //         'Access-Control-Allow-Origin': '*'
    //       }
    //     }
    //   )
    //   .then(res => {
    //     console.log(res);
    //   });

    //getting the list of all users
    axios
      .get(
        `https://us-central1-react-store-3406f.cloudfunctions.net/getAllUsers`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ userList: res.data });
      });
  }

  //function that will delete user and fetch a new user list in the callback
  deleteUser(uid, callback) {
    axios
      .get(
        `https://us-central1-react-store-3406f.cloudfunctions.net/deleteUser?text=` +
          uid,
        {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      .then(res => {
        console.log(res);
        callback();
      });
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.userList.map(user => {
            return (
              <ListGroupItem
                key={user.uid}
                className={styles['user__listGroup']}
              >
                <div className={styles['user__listGroupText']}>
                  {user.email}
                </div>
                <Button
                  color='danger'
                  outline
                  className={styles['user__listGroupBtn']}
                  onClick={() =>
                    this.deleteUser(user.uid, this.componentDidMount)
                  }
                >
                  Remove
                </Button>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}
