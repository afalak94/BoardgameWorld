import firebase from 'firebase/app';
import 'firebase/database';

const DB_config = {
  apiKey: 'AIzaSyCAEv8OsmbYHlXlHWBSHTQz8VBOrg5y-y4',
  authDomain: 'react-store-3406f.firebaseapp.com',
  databaseURL: 'https://react-store-3406f.firebaseio.com',
  projectId: 'react-store-3406f',
  storageBucket: 'react-store-3406f.appspot.com',
  messagingSenderId: '731538580683'
};

//check if connection alredy exists then connect or return connection
export default (!firebase.apps.length
  ? firebase.initializeApp(DB_config)
  : firebase.app());
