import { Component } from 'react';
import firebase from '../firebase.config';
import 'firebase/database';
import { addCategories, addToStore } from '../../Listing';
import { FirebaseTypes } from '../index';

export class FirebaseDB extends Component {
  saveDataFromDBToStore(branch, dispatch) {
    const keys = { boardgames: 'boardgames/', categories: 'categories/' };
    const dataType = keys[branch];
    //get all data from wanted firebase database branch (boardgames or categories)
    this.data = firebase.database().ref(dataType);
    this.data.on('value', snap => {
      //save categories data as array of objects with key-value pairs
      let data = [];
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

  addItemToUsersCart(newitem, user) {
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
  }

  removeItemFromUsersCart(removeitemId, user) {
    firebase
      .database()
      .ref('/carts')
      .child(user)
      .child(removeitemId)
      .remove();
  }

  fetchUsersItems(user, dispatch) {
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
  }

  increaseItemQuantity(itemId, user) {
    const quantity = firebase
      .database()
      .ref('/carts')
      .child(user)
      .child(itemId)
      .child('quantity');

    quantity.transaction(currentQuantity => {
      return currentQuantity + 1;
    });
  }

  decreaseItemQuantity(itemId, user) {
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
  }

  // saveItemsOnSaleToStore(addItemsOnSale) {
  //   //get all items from database
  //   firebase
  //     .database()
  //     .ref('boardgames/')
  //     .on('value', snap => {
  //       //save item data as array of objects with key-value pairs
  //       let data = [];
  //       snap.forEach(ss => {
  //         data.push({ key: ss.key, value: ss.val() });
  //       });
  //       //set state with boardgames that are on sale
  //       let itemsOnSale = [];
  //       data.forEach(item => {
  //         if (item.value.onSale === true) {
  //           itemsOnSale.push(item);
  //         }
  //       });
  //       addItemsOnSale(itemsOnSale);
  //     });
  // }

  addCategory(name) {
    //adding a new category to firebase
    //check if name is valid length
    if (name.length < 1 || name.length > 18) {
      alert('Invalid category name length');
    } else {
      // Get a key for a new Post.
      const newPostKey = firebase
        .database()
        .ref()
        .child('categories')
        .push().key;
      //update a new category to firebase
      let updates = {};
      updates['/categories/' + newPostKey] = name;
      return firebase
        .database()
        .ref()
        .update(updates);
    }
  }

  deleteCategory(key) {
    //removing category from firebase by using key
    firebase
      .database()
      .ref('categories/')
      .child(key)
      .remove();
  }

  deleteItem(key) {
    //removing category from firebase by using key
    firebase
      .database()
      .ref('boardgames/')
      .child(key)
      .remove();
  }

  //function that adds a new item in boardgames to firebase database
  addNewItem = (
    name,
    score,
    imgUrl,
    price,
    salePrice,
    onSale,
    description,
    category
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
    } else {
      //listener for new child entries
      firebase
        .database()
        .ref('boardgames/')
        .on('child_added', snap => {
          //console.log(snap.val());
        });
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
    }
  };
}
