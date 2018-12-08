import React, { Component } from 'react';
import { Button } from 'reactstrap';
//import { addToCart } from '../../modules/Cart/actions';
import { connect } from 'react-redux';

class GameInfo extends Component {
  constructor(props) {
    super(props);

    //find the boardgame from redux store with the id-1
    this.boardgame = this.props.boardgames[props.match.params.id - 1];
    console.log(this.props.boardgames);
    //console.log(props.match.params.id);
  }

  render() {
    return (
      <div className='gameinfo__wrapper'>
        <div className='gameinfo__img--size'>
          <img className='img-fluid' src={this.boardgame.imgUrl} alt='info' />
        </div>

        <div className='gameinfo__div'>
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
    boardgames: state.boardgames[0]
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
