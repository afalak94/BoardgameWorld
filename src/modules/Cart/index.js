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

class Cart extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.cart);

    this.calcTotal = this.calcTotal.bind(this);
  }

  calcTotal() {
    //calculate total price from all items in the cart
    let total = 0;
    this.props.cart.forEach(function(item) {
      total += item.price;
    });
    return total;
  }

  render() {
    return (
      <div className='cart'>
        <ListGroup className='cart__listgroup'>
          {this.props.cart.map((item, i) => {
            return (
              <ListGroupItem key={i} className='cart__list'>
                <div style={{ float: 'left' }}>
                  <img
                    className='img-thumbnail cart__itemImg'
                    src={item.imgUrl}
                    alt='cart item'
                  />
                </div>

                <div>
                  <Button
                    close
                    onClick={() => this.props.removeFromCart(item)}
                  />
                  <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
                  <ListGroupItemText>{item.price} $</ListGroupItemText>
                </div>
              </ListGroupItem>
            );
          })}
        </ListGroup>

        <div className='cart__summary'>
          <Jumbotron className='cart__summary__jumbotron'>
            <Container>
              <h1 className='display-3'>Cart summary</h1>
              <p className='lead'>Number of items: {this.props.cart.length}</p>
              <p className='lead'>Total price: {this.calcTotal()}</p>
            </Container>
          </Jumbotron>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    //adding boardgames to store
    // addToStore: games => {
    //   dispatch({ type: 'STORE_GAMES', payload: games });
    // }

    //adding item to cart
    // addToCart: item => {
    //   dispatch({ type: 'ADD', payload: item });
    // }

    //remove item from cart
    removeFromCart: item => {
      dispatch({ type: 'REMOVE', payload: item });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Cart);
