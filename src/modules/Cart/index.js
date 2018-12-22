//Cart component
import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Jumbotron,
  Container,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import firebase from '../../main/firebase.config';
import 'firebase/auth';
import 'firebase/database';
import { fetchitems, removeitem } from './actions';
import styles from './Cart.module.css';

class Cart extends Component {
  constructor(props) {
    super(props);

    this.authListener = this.authListener.bind(this);
    this.state = {
      user: [],
      cart: [],
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

  renderItems() {
    const { cart } = this.props;
    this.total = 0;
    this.itemsInCart = _.map(cart, (value, key) => {
      //calculate total price from all items in the cart
      //add regular or sale price
      if (String(value.value.onSale) === 'true') {
        this.total += parseFloat(value.value.salePrice, 10);
        this.itemValue = value.value.salePrice;
      } else {
        this.total += parseFloat(value.value.price, 10);
        this.itemValue = value.value.price;
      }

      return (
        <ListGroupItem key={key} className={styles['cart__listGroup--size']}>
          <div style={{ float: 'left' }}>
            <img
              className={styles['cart__itemImg']}
              src={value.value.imgUrl}
              alt='cart item'
            />
          </div>

          <div>
            <Button
              close
              onClick={() => this.props.removeitem(key, this.props.user.uid)}
            />
            <ListGroupItemHeading>{value.value.name}</ListGroupItemHeading>
            <ListGroupItemText>{this.itemValue} $</ListGroupItemText>
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
    //this.setState({ localCart: JSON.parse(localStorage.getItem('cart')) });
    this.itemsInCart = _.map(this.state.localCart, (value, key) => {
      //calculate total price from all items in the cart
      //add regular or sale price
      if (String(value.value.onSale) === 'true') {
        this.total += parseFloat(value.value.salePrice, 10);
        this.itemValue = value.value.salePrice;
      } else {
        this.total += parseFloat(value.value.price, 10);
        this.itemValue = value.value.price;
      }

      return (
        <ListGroupItem key={key} className={styles['cart__listGroup--size']}>
          <div style={{ float: 'left' }}>
            <img
              className={styles['cart__itemImg']}
              src={value.value.imgUrl}
              alt='cart item'
            />
          </div>

          <div>
            <Button close onClick={() => this.removeFromLocalStorage(key)} />
            <ListGroupItemHeading>{value.value.name}</ListGroupItemHeading>
            <ListGroupItemText>{this.itemValue} $</ListGroupItemText>
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
        this.setState({ cart: this.props.cart });
      }
    });
  }

  render() {
    return (
      <div className={styles['cart--flex']}>
        <ListGroup className={styles['cart__listGroup']}>
          {this.props.user ? this.renderItems() : this.renderLocalItems()}
        </ListGroup>

        <div className={styles['cart__summary']}>
          <Jumbotron className={styles['cart__summary__jumbotron']}>
            <Container>
              <h1 className='display-3'>Cart summary</h1>
              <p className='lead'>
                {this.props.user ? this.props.user.email : ''}
              </p>
              {this.itemsInCart ? (
                <p className='lead'>
                  Number of items: {this.itemsInCart.length}
                </p>
              ) : (
                ''
              )}

              <p className='lead'>
                Total price: {Math.round(this.total * 100) / 100}{' '}
              </p>
            </Container>
          </Jumbotron>
        </div>
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
    ...bindActionCreators({ fetchitems, removeitem }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Cart);
