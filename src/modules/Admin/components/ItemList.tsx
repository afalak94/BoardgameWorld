import React, { Component, SyntheticEvent, ReactNode } from 'react';
import { Button } from 'reactstrap';
import { Dispatch } from 'redux';
import _ from 'lodash';

import { FirebaseDB, FirebaseDBTypes } from '../../Firebase';
import { CategoryInterface } from '../../Boardgames';

import AddItemTemplate from './AddItemTemplate';
const styles = require('../../../main/css/Admin.module.css');

interface Props {
  dispatch: Dispatch;
  boardgames: any;
  categories: CategoryInterface[];
}

export default class ItemList extends Component<Props> {
  public FbDB: FirebaseDBTypes = new FirebaseDB({} as FirebaseDBTypes);
  public items: ReactNode;
  // REMINDER: dont use componentWillMount because it acts unexpectedly
  componentDidMount() {
    // this.FbDB = new FirebaseDB(null);
    const { dispatch } = this.props;
    this.FbDB.saveDataFromDBToStore('boardgames', dispatch);
    this.FbDB.saveDataFromDBToStore('categories', dispatch);
  }

  handleClick = (event: SyntheticEvent<HTMLButtonElement>): void => {
    const { itemKey } = event.currentTarget.dataset;
    this.FbDB.deleteItem(itemKey as string);
  };

  renderItems = (): ReactNode | null => {
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
    return null;
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
