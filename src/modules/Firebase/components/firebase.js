import { Component } from 'react';
import firebase from '../firebase.config';
import 'firebase/database';

//TODO: delete this service after implementing selector for sale games
export class FireBase extends Component {
  constructor(props) {
    super(props);

    this.items = firebase.database().ref('boardgames/');
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
