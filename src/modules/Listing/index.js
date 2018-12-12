//Listing container
import React, { Component } from 'react';
import GameCard from '../../main/gameCard';
import { Col } from 'reactstrap';
import { bindActionCreators } from 'redux';
//import actions
import { addToCart } from '../Cart/actions';
import { addToStore } from '../../main/Redux/actions';
import { connect } from 'react-redux';

class Listing extends Component {
  render() {
    return (
      <div className='listing__games'>
        {this.props.boardgames.map(game => {
          return (
            <Col xs='3' key={game.key}>
              <GameCard game={game} addToCart={this.props.addToCart} />
            </Col>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    boardgames: state.boardgames[state.boardgames.length - 1]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    //bind both action creators
    ...bindActionCreators({ addToStore, addToCart }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Listing);
