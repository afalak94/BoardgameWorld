import React, { Component } from 'react';
import { Button } from 'reactstrap';
//import { addToCart } from '../../modules/Cart/actions';
import { connect } from 'react-redux';

class GameInfo extends Component {
  constructor(props) {
    super(props);

    //find the boardgame from redux store with the coresponding key
    //this.boardgame = this.props.boardgames[props.match.params.id];
    //console.log(this.props.boardgames[props.match.params.id]);
    //console.log(this.props.match.params.id);
    //console.log(this.props.boardgames);
    this.props.boardgames.forEach(game => {
      if (game.key === this.props.match.params.id) {
        this.boardgame = game;
      }
    });
    //console.log(this.boardgame);
  }

  render() {
    return (
      <div className='gameinfo__wrapper'>
        <div className='gameinfo__img--size'>
          <img
            className='img-fluid'
            src={this.boardgame.value.imgUrl}
            alt='info'
          />
        </div>

        <div className='gameinfo__div'>
          <h2>{this.boardgame.value.name}</h2>
          <h4>Score: {this.boardgame.value.score}</h4>
          <h4>Price: {this.boardgame.value.price}</h4>
          <p>{this.boardgame.value.description}</p>
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
