import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { FirebaseDB } from '../../Firebase';
import AddItemTemplate from './AddItemTemplate';
import _ from 'lodash';
import styles from '../../../main/css/Admin.module.css';

export default class ItemList extends Component {
  constructor(props) {
    super(props);

    this.FbDB = new FirebaseDB();
  }

  //REMINDER: dont use componentWillMount because it acts unexpectedly
  componentDidMount() {
    // this.FbDB.saveItemsFromDBToStore(this.props.addToStore);
    this.FbDB.saveDataFromDBToStore('boardgames', this.props.dispatch);
    this.FbDB.saveDataFromDBToStore('categories', this.props.dispatch);
  }

  handleClick = event => {
    const { itemKey } = event.target.dataset;
    this.FbDB.deleteItem(itemKey);
  };

  renderItems = () => {
    const { boardgames } = this.props;
    this.items = _.map(boardgames, (value, key) => {
      return (
        <div className={styles['boardgames__item']} key={key}>
          <div className={styles['boardgames__itemName']}>
            {value.value.name}
          </div>

          <div className={styles['boardgames__itemRemove']}>
            <Button data-item-key={value.key} onClick={this.handleClick}>
              &times;
            </Button>
          </div>
        </div>
      );
    });
    if (!_.isEmpty(this.items)) {
      return this.items;
    }
  };

  render() {
    return (
      <div className={styles['itemManagement__wrapper']}>
        <div className={styles['boardgames__wrapper']}>
          {this.renderItems()}
        </div>

        <div className={styles['item__formContainer']}>
          <AddItemTemplate categories={this.props.categories} />
        </div>
      </div>
    );
  }
}
