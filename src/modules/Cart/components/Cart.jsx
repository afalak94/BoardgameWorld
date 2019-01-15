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
import { FirebaseAuth, FirebaseDB } from '../../Firebase';
import {
  fetchitems,
  removeitem,
  increaseQuantity,
  decreaseQuantity
} from '../../Firebase';
import { LocalStorageService } from '../../../main/services/LocalStorage';
import styles from '../../../main/css/Cart.module.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      localCart: JSON.parse(localStorage.getItem('cart'))
    };

    //instantiate LocalStorageService object
    this.LS = new LocalStorageService();
    //instantiate Firebase authentication object
    this.FbAuth = new FirebaseAuth();
    //instantiate firebase database object
    this.FbDB = new FirebaseDB();
  }

  componentDidMount() {
    this.unsubscribe = this.FbAuth.fetchUserCart(this.props.dispatch);
  }

  componentWillUnmount() {
    //stop listener for user authentication
    this.unsubscribe();
  }

  /* GUEST HANDLERS */
  handleGuestDelete = event => {
    const { key } = event.target.dataset;
    this.setState(() => {
      const local = this.LS.removeFromLocalStorage(key);
      return { localCart: local };
    });
  };

  handleGuestIncrement = event => {
    const { key } = event.target.dataset;
    this.setState(() => {
      const local = this.LS.increaseLocalStorageQuantity(key);
      return { localCart: local };
    });
  };

  handleGuestDecrement = event => {
    const { key } = event.target.dataset;
    this.setState(() => {
      const local = this.LS.decreaseLocalStorageQuantity(key);
      return { localCart: local };
    });
  };
  /* GUEST HANDLERS */

  /* USER HANDLERS */
  //Meybe create functions in FB database service and dispatch actions from there
  handleUserDelete = event => {
    const { itemKey } = event.target.dataset;
    this.props.dispatch(removeitem(itemKey, this.props.user.uid));
  };

  handleUserIncrement = event => {
    const { itemKey } = event.target.dataset;
    this.props.dispatch(increaseQuantity(itemKey, this.props.user.uid));
  };

  handleUserDecrement = event => {
    const { itemKey } = event.target.dataset;
    this.props.dispatch(decreaseQuantity(itemKey, this.props.user.uid));
  };
  /* USER HANDLERS */

  renderUserItems = () => {
    const { cart } = this.props;
    this.total = 0;
    this.numOfItems = 0;

    this.itemsInCart = _.map(cart, (value, key) => {
      //calculate total price from all items in the cart
      //add regular or sale price
      if (value) {
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
                onClick={this.handleUserDelete}
                data-item-key={key}
              >
                &times;
              </button>
              <ListGroupItemHeading>{value.data.name}</ListGroupItemHeading>
              <ListGroupItemText>{this.itemValue} $</ListGroupItemText>
              <ListGroupItemText>
                Quantity:
                <Button
                  onClick={this.handleUserDecrement}
                  data-item-key={key}
                  className={styles['cart__listGroup__btn']}
                >
                  &#8722;
                </Button>
                {value.quantity}
                <Button
                  onClick={this.handleUserIncrement}
                  data-item-key={key}
                  className={styles['cart__listGroup__btn']}
                >
                  &#43;
                </Button>
              </ListGroupItemText>
            </div>
          </ListGroupItem>
        );
      }
    });
    if (!_.isEmpty(this.itemsInCart)) {
      return this.itemsInCart;
    }
  };

  renderLocalItems = () => {
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
            <button
              className={styles['cart__removeBtn']}
              data-key={key}
              onClick={this.handleGuestDelete}
            >
              &times;
            </button>
            <ListGroupItemHeading>{value.data.value.name}</ListGroupItemHeading>
            <ListGroupItemText>{this.itemValue} $</ListGroupItemText>
            <ListGroupItemText>
              Quantity:
              <button
                data-key={key}
                onClick={this.handleGuestDecrement}
                className={styles['cart__listGroup__btn']}
              >
                &#8722;
              </button>
              {value.quantity}
              <button
                data-key={key}
                onClick={this.handleGuestIncrement}
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
  };

  render() {
    return (
      <div className={styles['cart__wrapper']}>
        <ListGroup className={styles['cart__listGroup']}>
          {this.props.user ? this.renderUserItems() : this.renderLocalItems()}
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
    ...bindActionCreators({
      fetchitems,
      removeitem,
      increaseQuantity,
      decreaseQuantity
    }),
    dispatch
  };
}

export const CartConn = connect(
  mapStateToProps,
  mapDispatchtoProps
)(Cart);
