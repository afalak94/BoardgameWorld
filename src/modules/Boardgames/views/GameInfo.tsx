import React, { Component, ReactNode } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { FirebaseDB, FirebaseDBTypes } from '../../Firebase';
import {
  LocalStorageService,
  LocalStorageInterface,
  ReduxState
} from '../../../main';
import { User } from '../../Authentication';
import { locateGameByKey } from '../index';
import { Boardgame } from '../consts/interfaces';
const styles = require('../../../main/css/GameInfo.module.css');

interface Props {
  dispatch: Dispatch;
  user: User;
  match: { params: { id: string } };
  boardgames: Boardgame[];
}

class GameInfo extends Component<Props> {
  // find the boardgame from redux store with the coresponding key
  public boardgame: Boardgame | null = locateGameByKey(this.props);
  // instantiate service objects
  public LS: LocalStorageInterface = new LocalStorageService({});
  public FbDB: FirebaseDBTypes = new FirebaseDB({} as FirebaseDBTypes);

  constructor(props: Props) {
    super(props);

    const { dispatch } = this.props;
    this.FbDB.saveDataFromDBToStore('boardgames', dispatch);
  }

  // when user refreshes page, redux store is updated again and component can locate game
  componentWillReceiveProps(nextProps: Props) {
    this.boardgame = locateGameByKey(nextProps);
  }

  renderCategories = (): ReactNode => {
    if (!this.boardgame) {
      return null;
    }
    return this.boardgame.value.category.map((category, index) => {
      return (
        <li className={styles['gameinfo__categoryItem']} key={index}>
          {category}
        </li>
      );
    });
  };

  renderPrice = (): ReactNode => {
    if (!this.boardgame) {
      return null;
    }
    const { onSale, price, salePrice } = this.boardgame.value;
    if (onSale === false) {
      return <div className={styles['gameinfo__price']}>Price: {price} $</div>;
    }
    return (
      <div className={styles['gameinfo__price']}>
        <div className={styles['gameinfo__oldPrice']}>Old price: {price} $</div>
        <div>SALE: {salePrice} $</div>
      </div>
    );
  };

  handleClick = (): any => {
    if (!this.boardgame) {
      return null;
    }
    const { user } = this.props;
    user.uid !== 'guest'
      ? this.FbDB.addItemToUsersCart(this.boardgame as Boardgame, user)
      : this.LS.addToLocalStorage(this.boardgame as Boardgame);
  };

  render() {
    if (!this.boardgame) {
      return <h1>Loading...</h1>;
    }

    const { imgUrl, name, score, description } = this.boardgame.value;
    return (
      <div className={styles['gameinfo__wrapper']}>
        <div className={styles['gameinfo__imgContainer']}>
          <img className={styles['gameinfo__img']} src={imgUrl} alt='info' />
        </div>

        <div className={styles['gameinfo__info']}>
          <div className={styles['gameinfo__name']}>
            {name}
            <div className={styles['gameinfo__categories']}>
              <ul>{this.renderCategories()}</ul>
            </div>
          </div>

          <div className={styles['gameinfo__scoreWrapper']}>
            <div className={styles['gameinfo__score']} />
            <div className={styles['gameinfo__scoreNum']}>{score}</div>
          </div>
        </div>

        <div className={styles['gameinfo__description']}>
          <h4>{description}</h4>
        </div>

        <div className={styles['gameinfo__buy']}>
          {this.renderPrice()}
          <Button color='success' onClick={this.handleClick}>
            Add to Cart
          </Button>
        </div>
      </div>
    );
  }
}

export const GameInfoConn = connect(
  (state: ReduxState) => {
    return {
      user: state.user[0],
      boardgames: state.boardgames[0]
    };
  },
  null
)(GameInfo as any);
