import { Component } from 'react';
import { Dispatch } from 'redux';
import 'firebase/database';

import firebase from '../firebase.config';
import { addCategories, addToStore, Boardgame } from '../../Boardgames';
import { FirebaseTypes, FirebaseDBTypes } from '../index';
import { User } from '../../Authentication';

export class FirebaseDB extends Component<FirebaseDBTypes> {
  saveDataFromDBToStore(branch: string, dispatch: Dispatch): void {
    const keys = { boardgames: 'boardgames/', categories: 'categories/' };
    const dataType: string = keys[branch];
    // get all data from wanted firebase database branch (boardgames or categories)
    const Data = firebase.database().ref(dataType);
    Data.on('value', snap => {
      // save categories data as array of objects with key-value pairs
      const data: Array<{ key: string | null; value: any }> = [];
      if (!snap) {
        return;
      }
      snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      if (dataType === 'boardgames/') {
        dispatch(addToStore(data));
        return;
      }
      dispatch(addCategories(data));
    });
  }

  addItemToUsersCart(newitem: Boardgame, user: User) {
    const updates = {};
    firebase
      .database()
      .ref('carts/' + user.uid + '/' + newitem.key)
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          // if item in cart exists alredy, update its quantity
          const quantity = snapshot.val().quantity;
          updates['/carts/' + user.uid + '/' + newitem.key + '/quantity'] =
            quantity + 1;
          firebase
            .database()
            .ref()
            .update(updates);
          return;
        }
        // if item in cart doesnt exist, create it
        const data = {
          quantity: 1,
          data: newitem.value
        };
        updates['/carts/' + user.uid + '/' + newitem.key] = data;
        firebase
          .database()
          .ref()
          .update(updates);
      });
  }

  removeItemFromUsersCart(removeitemId: string, userUid: string) {
    firebase
      .database()
      .ref('/carts')
      .child(userUid)
      .child(removeitemId)
      .remove();
  }

  fetchUsersItems(userUid: string, dispatch: Dispatch) {
    firebase
      .database()
      .ref('/carts')
      .child(userUid)
      .on('value', snapshot => {
        if (snapshot) {
          dispatch({
            type: FirebaseTypes.FETCH_ITEMS,
            payload: snapshot.val()
          });
        }
      });
  }

  increaseItemQuantity(itemId: string, userUid: string) {
    const quantity = firebase
      .database()
      .ref('/carts')
      .child(userUid)
      .child(itemId)
      .child('quantity');

    quantity.transaction(currentQuantity => {
      return currentQuantity + 1;
    });
  }

  decreaseItemQuantity(itemId: string, userUid: string) {
    const quantity = firebase
      .database()
      .ref('/carts')
      .child(userUid)
      .child(itemId)
      .child('quantity');

    quantity.transaction(currentQuantity => {
      // delete item if its quantity should drop to zero
      if (currentQuantity === 1) {
        firebase
          .database()
          .ref('/carts')
          .child(userUid)
          .child(itemId)
          .remove();
        return;
      }
      return currentQuantity - 1;
    });
  }

  addCategory(name: string) {
    // adding a new category to firebase
    // check if name is valid length
    if (name.length < 1 || name.length > 18) {
      alert('Invalid category name length');
      return;
    }
    // Get a key for a new Post.
    const newPostKey = firebase
      .database()
      .ref()
      .child('categories')
      .push().key;
    // update a new category to firebase
    const updates = {};
    updates['/categories/' + newPostKey] = name;
    return firebase
      .database()
      .ref()
      .update(updates);
  }

  deleteCategory(key: string) {
    // removing category from firebase by using key
    firebase
      .database()
      .ref('categories/')
      .child(key)
      .remove();
  }

  deleteItem(key: string) {
    // removing category from firebase by using key
    firebase
      .database()
      .ref('boardgames/')
      .child(key)
      .remove();
  }

  // function that adds a new item in boardgames to firebase database
  addNewItem = (
    name: string,
    score: string,
    imgUrl: string,
    price: string,
    salePrice: string,
    onSale: boolean,
    description: string,
    category: string[]
  ) => {
    if (
      !name ||
      !score ||
      !imgUrl ||
      !price ||
      !salePrice ||
      !description ||
      !category
    ) {
      alert('All fields are required');
      return;
    }
    // listener for new child entries
    firebase
      .database()
      .ref('boardgames/')
      .on('child_added', snap => {});
    // Item data
    const itemData = {
      name: name,
      score: score,
      imgUrl: imgUrl,
      price: price,
      salePrice: salePrice,
      onSale: onSale,
      description: description,
      category: category
    };
    // Get a key for a new Post.
    const newItemKey = firebase
      .database()
      .ref()
      .child('boardgames')
      .push().key;

    // Write the new item's data
    const updates = {};
    updates['/boardgames/' + newItemKey] = itemData;

    return firebase
      .database()
      .ref()
      .update(updates);
  };
}
