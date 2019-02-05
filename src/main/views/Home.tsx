import React, { Component, ReactNode } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { SaleCarousel, ReduxState } from '../index';
import { User } from '../../modules/Authentication';
import { FirebaseDB, FirebaseDBTypes } from '../../modules/Firebase';
import {
  saleGamesSelector,
  GameCard,
  Boardgame
} from '../../modules/Boardgames';
const styles = require('../css/Home.module.css');

interface ReduxStateProps {
  saleGames: Boardgame[];
  user: User;
}

interface Props extends ReduxStateProps {
  dispatch: Dispatch;
}

class Home extends Component<Props> {
  public FbDB: FirebaseDBTypes;
  public saleItems: ReactNode;

  constructor(props: Props) {
    super(props);

    this.FbDB = new FirebaseDB(null);
  }

  componentDidMount() {
    this.FbDB.saveDataFromDBToStore('boardgames', this.props.dispatch);
  }

  renderSaleGames = (): ReactNode => {
    const { saleGames } = this.props;
    this.saleItems = _.map(saleGames, (value, key) => {
      return <GameCard key={key} game={value} user={this.props.user} />;
    });
    if (!_.isEmpty(this.saleItems)) {
      return this.saleItems;
    }
    return null;
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

const mapStateToProps = (state: ReduxState): ReduxStateProps => ({
  user: state.user[0],
  saleGames: saleGamesSelector(state)
});

export const HomeConn = connect(
  mapStateToProps,
  null
)(Home);
