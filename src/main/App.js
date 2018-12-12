import React, { Component } from 'react';
import './App.css';
import GameCard from './gameCard';
import SaleCarousel from './carousel';
import { Col } from 'reactstrap';
import { connect } from 'react-redux';
import firebase from './firebase.config';
import 'firebase/database';
//import store from './store';
import { bindActionCreators } from 'redux';
//import actions
import { addToCart } from '../modules/Cart/actions';
import { addToStore } from './Redux/actions';
import { updateStore } from './Redux/actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.boardgames = [];
    this.state = { itemsOnSale: [] };
  }

  componentWillMount() {
    //get all games from database
    this.database = firebase.database().ref('boardgames/');
    this.database.on('value', snap => {
      //save item data as array of objects with key-value pairs
      let data = [];
      snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      //copy boardgames from firebase to redux store if they dont exist alredy
      //if (!this.props.boardgames[0]) {
      this.props.addToStore(data);
      //}

      //set state with boardgames that are on sale
      let itemsOnSale = [];
      data.forEach(item => {
        if (item.value.onSale === true) {
          itemsOnSale.push(item);
        }
      });
      this.setState({
        itemsOnSale: itemsOnSale
      });
      //console.log(this.state.itemsOnSale);
    });

    //listen for added games
    // this.database.on('child_added', snap => {
    //   const child = { key: snap.key, value: snap.val() };
    //   //console.log(child);
    //   this.props.updateStore(child);
    // });
  }

  render() {
    return (
      <div>
        <div className='home__carousel'>
          <SaleCarousel />
        </div>

        <div className='listing__games'>
          {this.state.itemsOnSale.map(game => {
            return (
              <Col xs='3' key={game.key}>
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
    ...bindActionCreators({ addToStore, addToCart, updateStore }, dispatch)

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
