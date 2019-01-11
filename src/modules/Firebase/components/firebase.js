import { Component } from 'react';
import firebase from '../firebase.config';
import 'firebase/auth';
import 'firebase/database';

export class FireBase extends Component {
  constructor(props) {
    super(props);

    this.items = firebase.database().ref('boardgames/');
  }

  fetchUserCart() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //when the user is logged in then fetch his cart from firebase
        this.props.fetchitems(this.props.user.uid);
      }
    });
  }

  pushAllItemsToStore() {
    //get all items from database
    this.items.on('value', snap => {
      //save item data as array of objects with key-value pairs
      let data = [];
      snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      //copy boardgames from firebase to redux store
      this.props.addToStore(data);
    });
  }

  getItemsOnSale() {
    //get all items from database
    this.items.on('value', snap => {
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
      this.setState({
        itemsOnSale: itemsOnSale
      });
    });
  }
}
