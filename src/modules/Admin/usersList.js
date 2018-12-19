import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import firebase from '../../main/firebase.config';
import 'firebase/database';

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = { categories: [] };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <ListGroup>
          {/* {this.state.categories.map(category => {
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
          })} */}
        </ListGroup>
      </div>
    );
  }
}
