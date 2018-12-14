import firebase from '../../main/firebase.config';
import 'firebase/database';
import 'firebase/auth';

//saves item to firebase db from current user
export const addToCart = (newitem, user) => async dispatch => {
  firebase
    .database()
    .ref('/carts')
    .child(user.uid)
    .push()
    .set(newitem);
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
