import React, { Component, ReactNode } from 'react';
import _ from 'lodash';
import { Jumbotron, Button } from 'reactstrap';

import { User } from '../../Authentication';
const styles = require('../../../main/css/Cart.module.css');

interface Props {
  user: User;
  itemsInCart: ReactNode;
  numOfItems: number;
  total: number;
}

export class CartSummary extends Component<Props> {
  render() {
    const { user, itemsInCart, numOfItems, total } = this.props;
    return (
      <Jumbotron className={styles['cart__summary__jumbotron']}>
        <h1 className={styles['cart__summary__header']}>Cart summary</h1>
        <div className={styles['cart__summary__user']}>
          User: {user ? user.email : 'Guest'}
        </div>
        {itemsInCart ? (
          <div className={styles['cart__summary__number']}>
            Number of items: <strong>{numOfItems}</strong>
          </div>
        ) : (
          'None'
        )}

        <div className={styles['cart__summary__price']}>Total price: </div>
        <div className={styles['cart__summary__priceNum']}>
          <strong>
            {Math.round(total * 100) / 100}
            {' $'}
          </strong>
        </div>

        <Button color='success'>CHECKOUT</Button>
      </Jumbotron>
    );
  }
}
