// Cart component
import React, { Component, ReactNode, MouseEvent } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Dispatch } from 'redux';

import {
  FirebaseAuth,
  FirebaseAuthTypes,
  FirebaseDB,
  FirebaseDBTypes
} from '../../Firebase';
import { CartInterface, CartSummary } from '../index';
import { LocalStorageService, ReduxState } from '../../../main';
import { User } from '../../Authentication';
const styles = require('../../../main/css/Cart.module.css');

interface Props {
  dispatch: Dispatch;
  user: User;
  cart: CartInterface | CartInterface[];
}

class Cart extends Component<Props> {
  state = {
    localCart: JSON.parse(localStorage.getItem('cart') as string)
  };

  public unsubscribe: any;
  public local: any;
  public total: number = 0;
  public numOfItems: number = 0;
  public itemValue: string = '';
  public itemsInCart: ReactNode;
  // instantiate LocalStorageService object
  public LS = new LocalStorageService({});
  // instantiate Firebase authentication object
  public FbAuth: FirebaseAuthTypes = new FirebaseAuth({});
  // instantiate firebase database object
  public FbDB: FirebaseDBTypes = new FirebaseDB({} as FirebaseDBTypes);

  componentDidMount() {
    this.unsubscribe = this.FbAuth.fetchUserCart(this.props.dispatch);
  }

  componentWillUnmount() {
    // stop listener for user authentication
    this.unsubscribe();
  }

  handleGuestActions = (event: MouseEvent<HTMLButtonElement>) => {
    const { key, name } = event.currentTarget.dataset;
    switch (name) {
      case 'delete':
        this.local = this.LS.removeFromLocalStorage(key as string);
        break;
      case 'decrease':
        this.local = this.LS.decreaseLocalStorageQuantity(key as string);
        break;
      case 'increase':
        this.local = this.LS.increaseLocalStorageQuantity(key as string);
        break;
      default:
        break;
    }
    this.setState(() => {
      return { localCart: this.local };
    });
  };

  handleUserActions = (event: MouseEvent<HTMLButtonElement>) => {
    const { itemKey, name } = event.currentTarget.dataset;
    const { uid } = this.props.user;
    switch (name) {
      case 'delete':
        this.FbDB.removeItemFromUsersCart(itemKey as string, uid);
        break;
      case 'decrease':
        this.FbDB.decreaseItemQuantity(itemKey as string, uid);
        break;
      case 'increase':
        this.FbDB.increaseItemQuantity(itemKey as string, uid);
        break;
      default:
        break;
    }
  };

  renderUserItems = () => {
    const { cart } = this.props;
    this.total = 0;
    this.numOfItems = 0;

    this.itemsInCart = _.map(cart, (value, key) => {
      // calculate total price from all items in the cart
      // add regular or sale price
      if (value && value !== 'empty') {
        if (String(value.data.onSale) === 'true') {
          this.total += parseFloat(value.data.salePrice) * value.quantity;
          this.itemValue = value.data.salePrice;
        } else {
          this.total += parseFloat(value.data.price) * value.quantity;
          this.itemValue = value.data.price;
        }
        // calculate number of all items in users cart
        this.numOfItems += value.quantity;

        return (
          <ListGroupItem key={key} className={styles['cart__listGroup--size']}>
            <div className={styles['cart__listGroup__imgDiv']}>
              <img
                className={styles['cart__itemImg']}
                src={value.data.imgUrl}
                alt='cart item'
              />
            </div>

            <div>
              <button
                className={styles['cart__removeBtn']}
                onClick={this.handleUserActions}
                data-item-key={key}
                data-name='delete'
              >
                &times;
              </button>
              <ListGroupItemHeading>{value.data.name}</ListGroupItemHeading>
              <ListGroupItemText>{this.itemValue} $</ListGroupItemText>
              <ListGroupItemText>
                Quantity:
                <Button
                  onClick={this.handleUserActions}
                  data-item-key={key}
                  data-name='decrease'
                  className={styles['cart__listGroup__btn']}
                >
                  &#8722;
                </Button>
                {value.quantity}
                <Button
                  onClick={this.handleUserActions}
                  data-item-key={key}
                  data-name='increase'
                  className={styles['cart__listGroup__btn']}
                >
                  &#43;
                </Button>
              </ListGroupItemText>
            </div>
          </ListGroupItem>
        );
      }
      return null;
    });
    if (!_.isEmpty(this.itemsInCart)) {
      return this.itemsInCart;
    }
    return null;
  };

  renderLocalItems = () => {
    this.total = 0;
    this.numOfItems = 0;

    this.itemsInCart = _.map(this.state.localCart, (value, key) => {
      // calculate total price from all items in the cart
      if (String(value.data.value.onSale) === 'true') {
        this.total += parseFloat(value.data.value.salePrice) * value.quantity;
        this.itemValue = value.data.value.salePrice;
      } else {
        this.total += parseFloat(value.data.value.price) * value.quantity;
        this.itemValue = value.data.value.price;
      }
      // calculate number of all items in guests cart
      this.numOfItems += value.quantity;

      return (
        <ListGroupItem key={key} className={styles['cart__listGroup--size']}>
          <div className={styles['cart__listGroup__imgDiv']}>
            <img
              className={styles['cart__itemImg']}
              src={value.data.value.imgUrl}
              alt='cart item'
            />
          </div>

          <div>
            <button
              className={styles['cart__removeBtn']}
              data-key={key}
              data-name='delete'
              onClick={this.handleGuestActions}
            >
              &times;
            </button>
            <ListGroupItemHeading>{value.data.value.name}</ListGroupItemHeading>
            <ListGroupItemText>{this.itemValue} $</ListGroupItemText>
            <ListGroupItemText>
              Quantity:
              <button
                data-key={key}
                data-name='decrease'
                onClick={this.handleGuestActions}
                className={styles['cart__listGroup__btn']}
              >
                &#8722;
              </button>
              {value.quantity}
              <button
                data-key={key}
                data-name='increase'
                onClick={this.handleGuestActions}
                className={styles['cart__listGroup__btn']}
              >
                &#43;
              </button>
            </ListGroupItemText>
          </div>
        </ListGroupItem>
      );
    });
    if (!_.isEmpty(this.itemsInCart)) {
      return this.itemsInCart;
    }
    return null;
  };

  render() {
    const { user } = this.props;

    return (
      <div className={styles['cart__wrapper']}>
        <ListGroup className={styles['cart__listGroup']}>
          {user.uid !== 'guest'
            ? this.renderUserItems()
            : this.renderLocalItems()}
        </ListGroup>

        <CartSummary
          user={user}
          itemsInCart={this.itemsInCart}
          numOfItems={this.numOfItems}
          total={this.total}
        />
      </div>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    user: state.user[0],
    cart: state.cart[state.cart.length - 1]
  };
}

export const CartConn = connect(
  mapStateToProps,
  dispatch => {
    return { dispatch };
  }
)(Cart);
