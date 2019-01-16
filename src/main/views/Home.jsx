import React, { Component } from 'react';
import { GameCard, SaleCarousel } from './index';
import { connect } from 'react-redux';
import { FirebaseDB } from '../../modules/Firebase';
import { saleGamesSelector } from '../../modules/Listing';
import _ from 'lodash';
import styles from '../css/Home.module.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.FbDB = new FirebaseDB();
  }

  componentDidMount() {
    this.FbDB.saveDataFromDBToStore('boardgames', this.props.dispatch);
  }

  renderSaleGames = () => {
    const { saleGames } = this.props;
    this.saleItems = _.map(saleGames, (value, key) => {
      return (
        <GameCard
          className={styles['saleGames_card']}
          key={value.key}
          game={value}
          user={this.props.user}
          FbDB={this.FbDB}
        />
      );
    });
    if (!_.isEmpty(this.saleItems)) {
      return this.saleItems;
    }
  };

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

        <div className={styles['saleGames']}>{this.renderSaleGames()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user[0],
    saleGames: saleGamesSelector(state)
  };
}

export const HomeConn = connect(
  mapStateToProps,
  null
)(Home);
