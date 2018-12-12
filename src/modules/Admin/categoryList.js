import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import firebase from '../../main/firebase.config';
import 'firebase/database';

export default class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = { categories: [] };

    this.deleteCategory = this.deleteCategory.bind(this);
  }

  componentWillMount() {
    //get all categories from database
    this.database = firebase.database().ref('categories/');
    this.database.on('value', snap => {
      //save categories data as array of objects with key-value pairs
      let data = [];
      snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      this.setState({
        categories: data
      });
      // console.log(data);
      //console.log(this.state.categories);
    });
    //listen for deleting category then update state
    this.database.on('child_removed', snap => {
      //save categories data as array of objects with key-value pairs
      let data = [];
      snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      this.setState({
        categories: data
      });
    });
  }

  deleteCategory(name) {
    //removing category from firebase by using key
    this.database.child(name).remove();
  }

  render() {
    return (
      <div>
        <ListGroup>
          {this.state.categories.map(category => {
            return (
              <ListGroupItem key={category.key} className='category__listGroup'>
                <div className='category__listGroupText'>{category.value}</div>
                <Button
                  color='danger'
                  outline
                  className='category__listGroupBtn'
                  onClick={() => this.deleteCategory(category.key)}
                >
                  Remove
                </Button>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}
