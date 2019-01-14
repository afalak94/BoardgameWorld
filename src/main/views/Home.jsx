import React from 'react';
import { GameCard, SaleCarousel } from './index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FireBase, FirebaseDB, addToCart } from '../../modules/Firebase';
import { addToStore } from '../../modules/Listing';
import styles from '../css/Home.module.css';

class Home extends FireBase {
  constructor(props) {
    super(props);

    this.state = { itemsOnSale: [] };
    this.FbDB = new FirebaseDB();
  }

  componentDidMount() {
    this.FbDB.saveItemsFromDBToStore(this.props.addToStore);

    //TODO: implement selector for items on sale from boardgames array in store
    this.getItemsOnSale();
  }

  componentWillUnmount() {
    //destroy listener
    this.items.off();
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
    ...bindActionCreators({ addToStore, addToCart }, dispatch)
  };
}

export const HomeConn = connect(
  mapStateToProps,
  mapDispatchtoProps
)(Home);
