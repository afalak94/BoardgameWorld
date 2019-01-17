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
import styles from '../../../main/css/gameCard.module.css';
import { LocalStorageService } from '../../../main/services/LocalStorage';

export class GameCard extends Component {
  constructor(props) {
    super(props);

    //instantiate LocalStorageService object
    this.LS = new LocalStorageService();
  }

  handleClick = () => {
    const { game, user } = this.props;
    this.props.user.uid !== 'guest'
      ? //if the user is loged in, add item to his firebase cart
        this.props.FbDB.addItemToUsersCart(game, user)
      : //if its not, add item to local storage
        this.LS.addToLocalStorage(game);
  };

  renderPrices = () => {
    if (this.props.game.value.onSale === false) {
      return (
        <div style={{ fontSize: 20 }}>
          <div>Price: {this.props.game.value.price} $</div>
        </div>
      );
    }
    return (
      <div className={styles['gameCard__price']}>
        <div className={styles['gameCard__price--regular']}>
          Old price: {this.props.game.value.price} $
        </div>
        <div className={styles['gameCard__price--sale']}>
          <span>SALE: {this.props.game.value.salePrice} $</span>
        </div>
      </div>
    );
  };

  renderDiscount = () => {
    //calculate discount percent and display it on sale items
    const { value } = this.props.game;
    if (!value) {
      return null;
    }

    const { onSale, salePrice, price } = value;
    if (onSale === true) {
      let discount = (1 - parseFloat(salePrice) / parseFloat(price)) * 100;
      return (
        <div className={styles['gameCard__saleOverlay']}>
          <span>-{Math.floor(discount)} %</span>
        </div>
      );
    }
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
