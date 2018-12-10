import React, { Component, Fragment } from 'react';
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
    //get all games from database
    this.database = firebase.database().ref('categories/');
    this.database.on('value', snap => {
      this.setState({
        categories: snap.val()
      });
      console.log(snap);
      console.log(this.state.categories);
    });
  }

  deleteCategory(key) {
    //removing category from firebase
    const database = firebase.database().ref('categories/');
    database.on('child_removed', snap => {
      console.log(snap.val());
    });
    database.child(key).remove();
  }

  render() {
    return (
      <Fragment>
        <div>
          <ListGroup>
            {this.state.categories.map((category, i) => {
              return (
                <ListGroupItem key={i} className='category__listGroup'>
                  {category}
                  <Button
                    style={{ color: '#d64933' }}
                    onClick={() => this.deleteCategory(i)}
                  >
                    Remove
                  </Button>
                </ListGroupItem>
              );
            })}
          </ListGroup>
        </div>
      </Fragment>
    );
  }
}
