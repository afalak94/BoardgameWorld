import { Component } from 'react';
import firebase from '../firebase.config';
import 'firebase/database';
import { addCategories, addToStore } from '../../Listing';

/* TODO: find out why dispatch happens twice every time */
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
