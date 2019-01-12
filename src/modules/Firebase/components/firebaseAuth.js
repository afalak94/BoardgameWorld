import { Component } from 'react';
import firebase from '../firebase.config';
import 'firebase/auth';
// import store from '../../../main/Redux/store';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { addUser } from '../../Authentication';

export class FirebaseAuth extends Component {
  userListener(addUser) {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        addUser(user);
        // store.dispatch(addUser);
      }
    });
    return unsubscribe;
  }

  adminRedirectListener(addUser, history) {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        addUser(user);
        if (user.uid === '6qXBbupnZsQkpp5vj5ZmteGF1qs1') {
          history.push('/admin');
        } else {
          history.push('/');
        }
      }
    });
    return unsubscribe;
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

  logoutUser(addUser, history) {
    //delete user data from redux store and redirect to Home
    let promise = new Promise(() => {
      firebase.auth().signOut();
    });
    promise.then(addUser(null)).then(history.push('/'));
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

// function mapDispatchtoProps(dispatch) {
//   return {
//     //bind both action creators
//     ...bindActionCreators({ addUser }, dispatch)
//   };
// }

// export const FirebaseAuthConn = connect(
//   null,
//   mapDispatchtoProps
// )(FirebaseAuth);
