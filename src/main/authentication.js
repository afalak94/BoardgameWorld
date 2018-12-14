import firebase from './firebase.config';
import 'firebase/auth';

export const user = firebase.auth().currentUser;
