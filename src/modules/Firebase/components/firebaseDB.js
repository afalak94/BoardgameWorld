import { Component } from 'react';
import firebase from '../firebase.config';
import 'firebase/database';

/* TODO: learn how to dispatch actions from here so there is no need
for passing them in parameters */
export class FirebaseDB extends Component {
  saveItemsFromDBToStore(addToStore) {
    //get all games from firebase database
    this.database = firebase.database().ref('boardgames/');
    this.database.on('value', snap => {
      //save item data as array of objects with key-value pairs
      let data = [];
      snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      //copy boardgames from firebase to redux store
      addToStore(data);
    });
  }

  saveCategoriesFromDBToStore(addCategories) {
    //get all categories from firebase database
    this.categories = firebase.database().ref('categories/');
    this.categories.on('value', async snap => {
      //save categories data as array of objects with key-value pairs
      let data = [];
      await snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      //console.log(data);
      addCategories(data);
    });
  }

  saveItemsOnSaleToStore(addItemsOnSale) {
    //get all items from database
    firebase
      .database()
      .ref('boardgames/')
      .on('value', snap => {
        //save item data as array of objects with key-value pairs
        let data = [];
        snap.forEach(ss => {
          data.push({ key: ss.key, value: ss.val() });
        });
        //set state with boardgames that are on sale
        let itemsOnSale = [];
        data.forEach(item => {
          if (item.value.onSale === true) {
            itemsOnSale.push(item);
          }
        });
        addItemsOnSale(itemsOnSale);
      });
  }

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
}
