import firebase from '../../main/firebase.config';
import 'firebase/database';
import 'firebase/auth';

//saves item to firebase db from current user
export const addToCart = (newitem, user) => async dispatch => {
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
export const removeitem = (removeitemId, user) => async dispatch => {
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
        type: 'FETCH_ITEMS',
        payload: snapshot.val()
      });
    });
};
