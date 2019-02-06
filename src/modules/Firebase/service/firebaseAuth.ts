import { Component } from 'react';
import 'firebase/auth';
import axios from 'axios';
import { Dispatch } from 'redux';

import firebase from '../firebase.config';
import { addUser } from '../../Authentication';
import { fetchitems, fetchUsers } from '../index';

export class FirebaseAuth extends Component {
  userListener(dispatch: Dispatch, history: { push(route: string): any }) {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(addUser(user));

        // if the history object has been provided, push to a new route
        if (history) {
          if (user.uid === '6qXBbupnZsQkpp5vj5ZmteGF1qs1') {
            history.push('/admin');
            return;
          }
          history.push('/');
        }
        return;
      }
      dispatch(addUser({ uid: 'guest', email: 'Guest' }));
    });
    return unsubscribe;
  }

  fetchUserCart(dispatch: Dispatch<any>) {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // when the user is logged in then fetch his cart from firebase
        dispatch(fetchitems(user.uid));
      }
    });
    return unsubscribe;
  }

  fetchAllUsers(dispatch: Dispatch) {
    // getting the list of all users
    axios
      .get(
        `https://us-central1-react-store-3406f.cloudfunctions.net/getAllUsers`
      )
      .then(res => {
        dispatch(fetchUsers(res.data));
      });
  }

  deleteUser(userUid: string, dispatch: Dispatch<any>): void {
    // protect admin user
    if (userUid === '6qXBbupnZsQkpp5vj5ZmteGF1qs1') {
      return;
    }

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
      .then(() => {
        // fetch users again to refresh users list in users management
        this.fetchAllUsers(dispatch);
      });
  }

  register(
    email: string,
    password: string,
    history: { push(route: string): any }
  ) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        // redirect loged in user to homepage
        history.push('/');
      })
      .catch(error => {
        // Handle Errors here.
        alert(error.message);
      });
  }

  loginUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        alert(error.message);
      });
  }

  logoutUser(dispatch: Dispatch<any>, history: { push(route: string): any }) {
    // delete user data from redux store and redirect to Home
    const promise = new Promise(() => {
      firebase.auth().signOut();
    });
    promise
      .then(dispatch(addUser({ uid: 'none', email: 'Guest' })) as any)
      .then(history.push('/'));
  }

  resetPW(email: string) {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Email sent.
        alert('Password reset mail has been sent to ' + email);
      })
      .catch(error => {
        // An error happened.
        alert(error.message);
      });
  }
}
