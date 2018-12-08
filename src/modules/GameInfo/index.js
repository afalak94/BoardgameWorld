import React, { Component } from 'react';
import store from '../../main/store';
import { Button } from 'reactstrap';
//import { addToCart } from '../../modules/Cart/actions';
import { connect } from 'react-redux';

class GameInfo extends Component {
  constructor(props) {
    super(props);

    //find the boardgame from redux store with the id-1
    this.boardgame = store.getState().boardgames[0][props.match.params.id - 1];
    console.log(this.boardgame);
    //console.log(props.match.params.id);
  }

  render() {
    return (
      <div className='gameinfo__wrapper'>
        <div className='gameinfo__img--size'>
          <img className='img-fluid' src={this.boardgame.imgUrl} alt='info' />
        </div>

        <div className='gameinfo__text'>
          <h2>{this.boardgame.name}</h2>
          <h4>Score: {this.boardgame.score}</h4>
          <h4>Price: {this.boardgame.price}</h4>
          <p>{this.boardgame.description}</p>
          <Button onClick={() => this.props.addToCart(this.boardgame)}>
            Add to Cart
          </Button>
        </div>
      </div>
    );
  }
}

//connect to redux store cart and enable addToCart function
function mapStateToProps(state) {
  return {
    cart: state.cart
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    //adding item to cart
    addToCart: item => {
      dispatch({ type: 'ADD', payload: item });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(GameInfo);
