import React, { Component } from 'react';
import { Button } from 'reactstrap';
import firebase from '../../Firebase/firebase.config';
import 'firebase/database';
import styles from '../../../main/css/Admin.module.css';

export default class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = { categories: [] };
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

  deleteCategory = event => {
    const { categoryKey } = event.target.dataset;
    //removing category from firebase by using key
    this.database.child(categoryKey).remove();
  };

  render() {
    return (
      <div className={styles['categories__wrapper']}>
        {this.state.categories.map(category => {
          return (
            <div className={styles['categories__item']} key={category.key}>
              <div className={styles['categories__itemName']}>
                {category.value}
              </div>

              <div className={styles['categories__itemRemove']}>
                <Button
                  data-category-key={category.key}
                  onClick={this.deleteCategory}
                >
                  &times;
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
