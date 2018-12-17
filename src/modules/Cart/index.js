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
      this.total += parseFloat(value.value.price, 10);
      return (
        <ListGroupItem key={key} className='cart__list'>
          <div style={{ float: 'left' }}>
            <img
              className='img-thumbnail cart__itemImg'
              src={value.value.imgUrl}
              alt='cart item'
            />
          </div>

          <div>
            <Button
              close
              onClick={() => this.props.removeitem(key, this.state.user.uid)}
            />
            <ListGroupItemHeading>{value.value.name}</ListGroupItemHeading>
            <ListGroupItemText>{value.value.price} $</ListGroupItemText>
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
      //console.log(value);
      //console.log(this.state.user);
      //calculate total price from all items in the cart
      this.total += parseFloat(value.value.price, 10);

      return (
        <ListGroupItem key={key} className='cart__list'>
          <div style={{ float: 'left' }}>
            <img
              className='img-thumbnail cart__itemImg'
              src={value.value.imgUrl}
              alt='cart item'
            />
          </div>

          <div>
            <Button close onClick={() => this.removeFromLocalStorage(key)} />
            <ListGroupItemHeading>{value.value.name}</ListGroupItemHeading>
            <ListGroupItemText>{value.value.price} $</ListGroupItemText>
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
      //console.log(user);
      if (user) {
        // User is signed in.
        //this.setState({ user });
        this.setState(() => {
          return { user };
        });
        //console.log(this.state.user.uid);

        //when the user is logged in then fetch his cart from firebase
        this.props.fetchitems(this.state.user.uid);
        this.setState({ cart: this.props.cart });
      } else {
        //console.log(user);
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <div className='cart'>
        <ListGroup className='cart__listgroup'>
          {this.state.user ? this.renderItems() : this.renderLocalItems()}
        </ListGroup>

        <div className='cart__summary'>
          <Jumbotron className='cart__summary__jumbotron'>
            <Container>
              <h1 className='display-3'>Cart summary</h1>
              <p className='lead'>
                {this.state.user ? this.state.user.email : ''}
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
