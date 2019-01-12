import { Component } from 'react';
import firebase from '../firebase.config';
import 'firebase/database';

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

  getCategoriesFromDB() {
    //get all categories from firebase database
    this.categories = firebase.database().ref('categories/');
    this.categories.on('value', async snap => {
      //save categories data as array of objects with key-value pairs
      let data = [];
      await snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      return data;
    });
  }
}
