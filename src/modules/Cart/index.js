//Cart component
import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from 'reactstrap';
import { connect } from 'react-redux';

class Cart extends Component {
  constructor(props) {
    super(props);

    console.log(this.props.cart);
  }
  render() {
    return (
      <ListGroup className='cart__listgroup'>
        {this.props.cart.map((item, i) => {
          return (
            <ListGroupItem key={i} className='cart__list'>
              <div style={{ float: 'left' }}>
                <img
                  className='img-thumbnail cart__itemImg'
                  src={item.imgUrl}
                />
              </div>

              <div>
                <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
                <ListGroupItemText>
                  <p>{item.price} $</p>
                </ListGroupItemText>
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

export default connect(
  mapStateToProps,
  null
)(Cart);
