import React, { Component } from 'react';
import './App.css';
import GameCard from './gameCard';
import { Col } from 'reactstrap';
import { connect } from 'react-redux';
import firebase from './firebase.config';
import 'firebase/database';
import store from './store';
import { bindActionCreators } from 'redux';
//import actions
import { addToCart } from '../modules/Cart/actions';
import { addToStore } from './Redux/actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.boardgames = [];
    this.state = { boardgames: [] };
  }

  componentWillMount() {
    //get all games from database
    this.database = firebase.database().ref('boardgames/');
    this.database.on('value', snap => {
      this.setState({
        boardgames: snap.val()
      });
      console.log(this.state.boardgames);

      //copy boardgames from firebase to redux store
      this.props.addToStore(snap.val());
      this.boardgames = store.getState().boardgames[0];
      console.log(this.boardgames);
    });
  }

  render() {
    return (
      <div className='App'>
        <div className='games__listing'>
          {this.state.boardgames.map(game => {
            return (
              <Col xs='3' key={game.id}>
                <GameCard game={game} addToCart={this.props.addToCart} />
              </Col>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    boardgames: state.boardgames
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    //bind both action creators
    ...bindActionCreators({ addToStore, addToCart }, dispatch)

    //adding boardgames to store
    // addToStore: games => {
    //   dispatch({ type: 'STORE_GAMES', payload: games });
    // }

    //adding item to cart
    // addToCart: item => {
    //   dispatch({ type: 'ADD', payload: item });
    // }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(App);
