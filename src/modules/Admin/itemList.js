import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button, Row, Col } from 'reactstrap';
import firebase from '../../main/firebase.config';
import 'firebase/database';
import ItemInfoTemplate from './itemInfoTemplate';

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

  deleteItem(name) {}

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
                <ItemInfoTemplate
                  item={this.state.items}
                  categories={this.state.categories}
                />
              ) : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
