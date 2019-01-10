import React, { Component } from 'react';
import { GameCard, SaleCarousel } from './index';
import { connect } from 'react-redux';
import firebase from '../../modules/Firebase/firebase.config';
import 'firebase/database';
import { bindActionCreators } from 'redux';
//import actions
import { addToCart } from '../../modules/Cart';
import { addToStore, updateStore } from '../../modules/Listing';
import styles from '../css/Home.module.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { itemsOnSale: [] };
  }

  componentDidMount() {
    //get all games from database
    this.database = firebase.database().ref('boardgames/');
    this.database.on('value', snap => {
      //save item data as array of objects with key-value pairs
      let data = [];
      snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      //copy boardgames from firebase to redux store
      this.props.addToStore(data);

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
    });
  }

  componentWillUnmount() {
    //destroy listeners for database and authentication
    this.database.off();
  }

  render() {
    return (
      <div className={styles['home__wrapper']}>
        <div className={styles['home__carousel']}>
          <SaleCarousel />
        </div>

        <div className={styles['home__saleInfo']}>
          <h1>Holiday Sale</h1>
          <br />
          Check out special holiday sale discounts on your favorite boardgames.
          Inluding specials like <strong>Gloomhaven</strong>,
          <strong>Terraforming Mars</strong>, <strong>Spirit Island </strong>
          and <strong>Scythe</strong>!
        </div>

        <div className={styles['saleGames']}>
          {this.state.itemsOnSale.map(game => {
            return (
              <GameCard
                className={styles['saleGames_card']}
                key={game.key}
                game={game}
                user={this.props.user}
                addToCart={this.props.addToCart}
              />
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
    boardgames: state.boardgames,
    user: state.user[0]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    //bind both action creators
    ...bindActionCreators({ addToStore, addToCart, updateStore }, dispatch)
  };
}

export const HomeConn = connect(
  mapStateToProps,
  mapDispatchtoProps
)(Home);
