import { Component } from 'react';
import firebase from '../firebase.config';
import 'firebase/auth';
import { addUser } from '../../Authentication';
import { fetchitems } from '../../Firebase';

export class FirebaseAuth extends Component {
  userListener(dispatch, history) {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(addUser(user));

        if (history) {
          if (user.uid === '6qXBbupnZsQkpp5vj5ZmteGF1qs1') {
            history.push('/admin');
            return;
          }
          history.push('/');
        }
      }
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

  // adminRedirectListener(dispatch, history) {
  //   const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       dispatch(addUser(user));
  //       if (user.uid === '6qXBbupnZsQkpp5vj5ZmteGF1qs1') {
  //         history.push('/admin');
  //       } else {
  //         history.push('/');
  //       }
  //     }
  //   });
  //   return unsubscribe;
  // }

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
    promise.then(dispatch(addUser(null))).then(history.push('/'));
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
