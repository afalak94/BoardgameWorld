import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { User } from '../../Authentication';
import { LocalStorageService, LocalStorageInterface } from '../../../main';
import { Boardgame } from '../../Boardgames';
import { FirebaseDB, FirebaseDBTypes } from '../../Firebase';

const styles = require('../../../main/css/gameCard.module.css');

interface Props {
  game: Boardgame;
  user: User;
}

export class GameCard extends Component<Props> {
  public FbDB: FirebaseDBTypes = new FirebaseDB(null);
  public LS: LocalStorageInterface = new LocalStorageService({});

  handleClick = () => {
    const { game, user } = this.props;
    this.props.user.uid !== 'guest'
      ? // if the user is loged in, add item to his firebase cart
        this.FbDB.addItemToUsersCart(game, user)
      : // if its not, add item to local storage
        this.LS.addToLocalStorage(game);
  };

  renderPrices = (): any => {
    const { value } = this.props.game;
    if (value.onSale === false) {
      return (
        <div style={{ fontSize: 20 }}>
          <div>Price: {value.price} $</div>
        </div>
      );
    }
    return (
      <div className={styles['gameCard__price']}>
        <div className={styles['gameCard__price--regular']}>
          Old price: {value.price} $
        </div>
        <div className={styles['gameCard__price--sale']}>
          <span>SALE: {value.salePrice} $</span>
        </div>
      </div>
    );
  };

  renderDiscount = (): any => {
    // calculate discount percent and display it on sale items
    const { value } = this.props.game;
    if (!value) {
      return null;
    }

    const { onSale, salePrice, price } = value;
    if (onSale === true) {
      const discount = (1 - parseFloat(salePrice) / parseFloat(price)) * 100;
      return (
        <div className={styles['gameCard__saleOverlay']}>
          <span>-{Math.floor(discount)} %</span>
        </div>
      );
    }
    return null;
  };

  render() {
    const { key, value } = this.props.game;
    return (
      <div>
        <Card className={styles['gameCard--size']}>
          {this.renderDiscount()}
          <CardImg
            top
            src={value.imgUrl}
            alt='Card image cap'
            className={styles['gameCard__img']}
          />
          <CardBody className={styles['gameCard__body']}>
            <CardTitle className={styles['gameCard__title']}>
              {value.name}
            </CardTitle>
            <CardSubtitle>Score: {value.score}</CardSubtitle>
            {this.renderPrices()}
            <Button
              tag={Link}
              to={'/game/' + key}
              className={styles['gameCard__btn']}
            >
              View more
            </Button>
            <Button
              className={styles['gameCard__btn']}
              onClick={this.handleClick}
            >
              Add to Cart
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}
