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
import styles from '../css/gameCard.module.css';

export class GameCard extends Component {
  constructor(props) {
    super(props);

    this.renderPrices = this.renderPrices.bind(this);
    this.renderDiscount = this.renderDiscount.bind(this);
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
    //console.log(this.props.game);
  }

  renderPrices() {
    if (this.props.game.value.onSale === false) {
      return (
        <div style={{ fontSize: 20 }}>
          <div>Price: {this.props.game.value.price} $</div>
        </div>
      );
    } else {
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
    }
  }

  renderDiscount() {
    //calculate discount percent and display it on sale items
    if (this.props.game.value.onSale === true) {
      let discount =
        (1 -
          parseFloat(this.props.game.value.salePrice) /
            parseFloat(this.props.game.value.price)) *
        100;
      return (
        <div className={styles['gameCard__saleOverlay']}>
          <span>-{Math.floor(discount)} %</span>
        </div>
      );
    }
  }

  addToLocalStorage(data) {
    //function that adds item to localStorage
    let exists = false;
    const oldStorage = JSON.parse(localStorage.getItem('cart'));

    //check if item alredy exists in localStorage
    oldStorage.forEach(item => {
      if (item.data.key === data.key) {
        //item exists, increment quantity
        exists = true;
        item.quantity++;
        localStorage.setItem('cart', JSON.stringify(oldStorage));
      }
    });

    //if item doesnt exists in localStorage, create it
    if (!exists) {
      const newStorage = [];
      if (oldStorage !== null) {
        newStorage.push(...oldStorage);
      }
      let item = {
        quantity: 1,
        data: data
      };
      newStorage.push(item);
      localStorage.setItem('cart', JSON.stringify(newStorage));
    }
  }

  render() {
    return (
      <div>
        <Card className={styles['gameCard--size']}>
          {this.renderDiscount()}
          <CardImg
            top
            src={this.props.game.value.imgUrl}
            alt='Card image cap'
            className={styles['gameCard__img']}
          />
          <CardBody className={styles['gameCard__body']}>
            <CardTitle className={styles['gameCard__title']}>
              {this.props.game.value.name}
            </CardTitle>
            <CardSubtitle>Score: {this.props.game.value.score}</CardSubtitle>
            {this.renderPrices()}
            <Button
              tag={Link}
              to={'/game/' + this.props.game.key}
              className={styles['gameCard__btn']}
            >
              View more
            </Button>
            <Button
              className={styles['gameCard__btn']}
              onClick={
                this.props.user
                  ? //if the user is loged in, add item to his firebase cart
                    () => this.props.addToCart(this.props.game, this.props.user)
                  : //if its not, add item to local storage
                    () => this.addToLocalStorage(this.props.game)
              }
            >
              Add to Cart
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}
