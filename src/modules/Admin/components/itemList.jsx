import React, { Component } from 'react';
import { Button } from 'reactstrap';
import firebase from '../../Firebase/firebase.config';
import 'firebase/database';
import AddItemTemplate from './addItemTemplate';
import styles from '../../../main/css/Admin.module.css';

export default class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      categories: [],
      gotData: false
    };
  }

  //REMINDER: dont use componentWillMount because it acts unexpectedly
  componentDidMount() {
    //get all items from database
    this.items = firebase.database().ref('boardgames/');
    this.items.on('value', snap => {
      //save item data as array of objects with key-value pairs
      let data = [];
      snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      this.setState({
        items: data
      });
      //console.log(data);
      //console.log(this.state.items);
    });

    //listen when the item has been removed and update the state
    this.items.on('child_removed', snap => {
      let data = [];
      snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      this.setState({
        items: data
      });
    });

    //get all categories from database
    this.categories = firebase.database().ref('categories/');
    this.categories.on('value', snap => {
      //save categories data as array of objects with key-value pairs
      let cat_data = [];
      snap.forEach(ss => {
        cat_data.push({ key: ss.key, value: ss.val() });
      });
      this.setState({
        categories: cat_data
      });
      //console.log(this.state.categories);
    });

    this.setState({ gotData: true });
  }

  componentWillUnmount() {
    //turn off subscriptions to prevent memory leak
    this.categories.off();
    this.items.off();
    //this.itemsRemoved.off();
    //this.newItemAdded.off();
  }

  deleteItem = event => {
    const { itemKey } = event.target.dataset;
    this.items.child(itemKey).remove();
  };

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
    //listener for new child entries
    this.items.on('child_added', snap => {
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
  };

  render() {
    return (
      <div className={styles['itemManagement__wrapper']}>
        <div className={styles['boardgames__wrapper']}>
          {this.state.items.map(item => {
            return (
              <div className={styles['boardgames__item']} key={item.key}>
                <div className={styles['boardgames__itemName']}>
                  {item.value.name}
                </div>

                <div className={styles['boardgames__itemRemove']}>
                  <Button data-item-key={item.key} onClick={this.deleteItem}>
                    &times;
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles['item__formContainer']}>
          {this.state.gotData ? (
            <AddItemTemplate
              item={this.state.items}
              categories={this.state.categories}
              addNewItem={this.addNewItem}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
