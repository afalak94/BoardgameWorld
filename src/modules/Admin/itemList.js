import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap';
import firebase from '../../main/firebase.config';
import 'firebase/database';
import AddItemTemplate from './addItemTemplate';

export default class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      categories: [],
      gotData: false,
      item: null
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
  }

  componentWillMount() {
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

  deleteItem(name) {
    //removing item (boardgame) from firebase by using key
    const database = firebase.database().ref('boardgames/');
    database.on('child_removed', snap => {
      //console.log(snap.val());
    });
    database.child(name).remove();
  }

  //function that adds a new item in boardgames to firebase database
  addNewItem(
    name,
    score,
    imgUrl,
    price,
    salePrice,
    onSale,
    description,
    category
  ) {
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
  }

  render() {
    return (
      <div>
        <Row style={{ width: 1500 }}>
          <Col sm={{ size: 'auto', offset: 1 }}>
            <ListGroup>
              {this.state.items.map(item => {
                return (
                  <ListGroupItem key={item.key} className='category__listGroup'>
                    <div className='category__listGroupText'>
                      {item.value.name}
                    </div>
                    <Button
                      color='danger'
                      outline
                      className='category__listGroupBtn'
                      onClick={() => this.deleteItem(item.key)}
                    >
                      Remove
                    </Button>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Col>

          <Col sm={{ size: 'auto' }}>
            <div className='item__formContainer'>
              {this.state.gotData ? (
                <AddItemTemplate
                  item={this.state.items}
                  categories={this.state.categories}
                  addNewItem={this.addNewItem}
                />
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
