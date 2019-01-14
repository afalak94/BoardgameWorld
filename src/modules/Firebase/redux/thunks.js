import firebase from '../firebase.config';
import 'firebase/database';
import 'firebase/auth';
import axios from 'axios';
import { FirebaseTypes } from './types';

//saves item to firebase db from current user
export const addToCart = (newitem, user) => async () => {
  let updates = {};
  firebase
    .database()
    .ref('carts/' + user.uid + '/' + newitem.key)
    .once('value')
    .then(snapshot => {
      if (snapshot.exists()) {
        //if item in cart exists alredy, update its quantity
        let quantity = snapshot.val().quantity;
        updates['/carts/' + user.uid + '/' + newitem.key + '/quantity'] =
          quantity + 1;
        firebase
          .database()
          .ref()
          .update(updates);
      } else {
        //if item in cart doesnt exist, create it
        let data = {
          quantity: 1,
          data: newitem.value
        };
        updates['/carts/' + user.uid + '/' + newitem.key] = data;
        firebase
          .database()
          .ref()
          .update(updates);
      }
    });
};

//removes item in firebase db from current user
export const removeitem = (removeitemId, user) => async () => {
  firebase
    .database()
    .ref('/carts')
    .child(user)
    .child(removeitemId)
    .remove();
};

//return items in firebase db and save them to redux cart
export const fetchitems = user => async dispatch => {
  firebase
    .database()
    .ref('/carts')
    .child(user)
    .on('value', snapshot => {
      dispatch({
        type: FirebaseTypes.FETCH_ITEMS,
        payload: snapshot.val()
      });
    });
};

//transactions for increasing or decreasing item quantity
export const increaseQuantity = (itemId, user) => async () => {
  const quantity = firebase
    .database()
    .ref('/carts')
    .child(user)
    .child(itemId)
    .child('quantity');

  quantity.transaction(currentQuantity => {
    return currentQuantity + 1;
  });
};

export const decreaseQuantity = (itemId, user) => async () => {
  const quantity = firebase
    .database()
    .ref('/carts')
    .child(user)
    .child(itemId)
    .child('quantity');

  quantity.transaction(currentQuantity => {
    //delete item if its quantity should drop to zero
    if (currentQuantity === 1) {
      firebase
        .database()
        .ref('/carts')
        .child(user)
        .child(itemId)
        .remove();
    } else {
      return currentQuantity - 1;
    }
  });
};

export const fetchUsers = () => async dispatch => {
  //getting the list of all users
  axios
    .get(`https://us-central1-react-store-3406f.cloudfunctions.net/getAllUsers`)
    .then(res => {
      //console.log(res.data);
      //this.setState({ userList: res.data });
      dispatch({
        type: FirebaseTypes.FETCH_USERS,
        payload: res.data
      });
    });
};

export const deleteUser = (userUid, fetchUsers) => async () => {
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
      fetchUsers();
    });
};
