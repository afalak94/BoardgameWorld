import { Component } from 'react';
import firebase from '../firebase.config';
import 'firebase/auth';
import { addUser } from '../../Authentication';
import { fetchitems, fetchUsers, FirebaseTypes } from '..';
import axios from 'axios';

export class FirebaseAuth extends Component {
  userListener(dispatch, history) {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(addUser(user));

        //if the history object has been provided, push to a new route
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

  fetchUserCart(dispatch) {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //when the user is logged in then fetch his cart from firebase
        dispatch(fetchitems(user.uid));
      }
    });
    return unsubscribe;
  }

  fetchAllUsers(dispatch) {
    //getting the list of all users
    axios
      .get(
        `https://us-central1-react-store-3406f.cloudfunctions.net/getAllUsers`
      )
      .then(res => {
        dispatch({
          type: FirebaseTypes.FETCH_USERS,
          payload: res.data
        });
      });
  }

  deleteUser(userUid, dispatch) {
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
        //fetch users again to refresh users list in users management
        dispatch(fetchUsers());
      });
  }

  register(email, password, history) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        //redirect loged in user to homepage
        history.push('/');
      })
      .catch(error => {
        // Handle Errors here.
        console.log(error.message);
      });
  }

  loginUser(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log(error.message);
      });
  }

  logoutUser(dispatch, history) {
    //delete user data from redux store and redirect to Home
    let promise = new Promise(() => {
      firebase.auth().signOut();
    });
    promise
      .then(dispatch(addUser({ uid: 'none', email: 'Guest' })))
      .then(history.push('/'));
  }

  resetPW(email) {
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
