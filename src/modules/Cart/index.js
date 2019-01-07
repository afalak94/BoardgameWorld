//Cart component
import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Jumbotron,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import firebase from '../../main/firebase.config';
import 'firebase/auth';
import 'firebase/database';
import {
  fetchitems,
  removeitem,
  increaseQuantity,
  decreaseQuantity
} from './actions';
import styles from './Cart.module.css';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.authListener = this.authListener.bind(this);
    this.state = {
      user: [],
      localCart: JSON.parse(localStorage.getItem('cart'))
    };
  }

  componentDidMount() {
    this.authListener();
  }

  componentWillUnmount() {
    //stop listener for user authentication
    this.unsubscribe();
  }

  removeFromLocalStorage(key) {
    const oldStorage = JSON.parse(localStorage.getItem('cart'));
    oldStorage.splice(key, 1);
    localStorage.setItem('cart', JSON.stringify(oldStorage));
    this.setState({ localCart: JSON.parse(localStorage.getItem('cart')) });
  }

  increaseLocalStorageQuantity(key) {
    const storage = JSON.parse(localStorage.getItem('cart'));
    storage[key].quantity++;
    localStorage.setItem('cart', JSON.stringify(storage));
    this.setState({ localCart: JSON.parse(localStorage.getItem('cart')) });
  }
  decreaseLocalStorageQuantity(key) {
    const storage = JSON.parse(localStorage.getItem('cart'));
    storage[key].quantity--;
    if (storage[key].quantity === 0) {
      this.removeFromLocalStorage(key);
    } else {
      localStorage.setItem('cart', JSON.stringify(storage));
    }
    this.setState({ localCart: JSON.parse(localStorage.getItem('cart')) });
  }

  renderItems() {
    const { cart } = this.props;
    this.total = 0;
    this.numOfItems = 0;

    this.itemsInCart = _.map(cart, (value, key) => {
      //calculate total price from all items in the cart
      //add regular or sale price
      if (String(value.data.onSale) === 'true') {
        this.total += parseFloat(value.data.salePrice, 10) * value.quantity;
        this.itemValue = value.data.salePrice;
      } else {
        this.total += parseFloat(value.data.price, 10) * value.quantity;
        this.itemValue = value.data.price;
      }
      //calculate number of all items in users cart
      this.numOfItems += value.quantity;

      return (
        <ListGroupItem key={key} className={styles['cart__listGroup--size']}>
          <div style={{ float: 'left' }}>
            <img
              className={styles['cart__itemImg']}
              src={value.data.imgUrl}
              alt='cart item'
            />
          </div>

          <div>
            <Button
              close
              onClick={() => this.props.removeitem(key, this.props.user.uid)}
            />
            <ListGroupItemHeading>{value.data.name}</ListGroupItemHeading>
            <ListGroupItemText>{this.itemValue} $</ListGroupItemText>
            <ListGroupItemText>
              Quantity:
              <Button
                onClick={() =>
                  this.props.decreaseQuantity(key, this.props.user.uid)
                }
                className={styles['cart__listGroup__btn']}
              >
                &#8722;
              </Button>
              {value.quantity}
              <Button
                onClick={() =>
                  this.props.increaseQuantity(key, this.props.user.uid)
                }
                className={styles['cart__listGroup__btn']}
              >
                &#43;
              </Button>
            </ListGroupItemText>
          </div>
        </ListGroupItem>
      );
    });
    if (!_.isEmpty(this.itemsInCart)) {
      return this.itemsInCart;
    }
  }

  renderLocalItems() {
    this.total = 0;
    this.numOfItems = 0;
    this.itemsInCart = _.map(this.state.localCart, (value, key) => {
      //calculate total price from all items in the cart
      if (String(value.data.value.onSale) === 'true') {
        this.total +=
          parseFloat(value.data.value.salePrice, 10) * value.quantity;
        this.itemValue = value.data.value.salePrice;
      } else {
        this.total += parseFloat(value.data.value.price, 10) * value.quantity;
        this.itemValue = value.data.value.price;
      }
      //calculate number of all items in guests cart
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
            <Button close onClick={() => this.removeFromLocalStorage(key)} />
            <ListGroupItemHeading>{value.data.value.name}</ListGroupItemHeading>
            <ListGroupItemText>{this.itemValue} $</ListGroupItemText>
            <ListGroupItemText>
              Quantity:
              <Button
                onClick={() => this.decreaseLocalStorageQuantity(key)}
                className={styles['cart__listGroup__btn']}
              >
                &#8722;
              </Button>
              {value.quantity}
              <Button
                onClick={() => this.increaseLocalStorageQuantity(key)}
                className={styles['cart__listGroup__btn']}
              >
                &#43;
              </Button>
            </ListGroupItemText>
          </div>
        </ListGroupItem>
      );
    });
    if (!_.isEmpty(this.itemsInCart)) {
      return this.itemsInCart;
    }
  }

  //listener for user authentication
  authListener() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //when the user is logged in then fetch his cart from firebase
        this.props.fetchitems(this.props.user.uid);
      }
    });
  }

  render() {
    return (
      <div className={styles['cart__wrapper']}>
        <ListGroup className={styles['cart__listGroup']}>
          {this.props.user ? this.renderItems() : this.renderLocalItems()}
        </ListGroup>

        <Jumbotron className={styles['cart__summary__jumbotron']}>
          <h1 className={styles['cart__summary__header']}>Cart summary</h1>
          <div className={styles['cart__summary__user']}>
            User: {this.props.user ? this.props.user.email : 'Guest'}
          </div>
          {this.itemsInCart ? (
            <div className={styles['cart__summary__number']}>
              Number of items: <strong>{this.numOfItems}</strong>
            </div>
          ) : (
            'None'
          )}

          <div className={styles['cart__summary__price']}>Total price: </div>
          <div className={styles['cart__summary__priceNum']}>
            <strong>
              {Math.round(this.total * 100) / 100}
              {' $'}
            </strong>
          </div>

          <Button color='success'>CHECKOUT</Button>
        </Jumbotron>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user[0],
    cart: state.cart[state.cart.length - 1]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    //bind both action creators
    ...bindActionCreators(
      { fetchitems, removeitem, increaseQuantity, decreaseQuantity },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Cart);
