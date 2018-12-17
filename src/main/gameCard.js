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
//import { firebaseConnect } from 'react-redux-firebase';

class GameCard extends Component {
  constructor(props) {
    super(props);

    this.renderPrices = this.renderPrices.bind(this);
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
    //console.log(this.props.game);
  }

  renderPrices() {
    if (this.props.game.value.onSale === false) {
      return (
        <div style={{ fontSize: 20 }}>
          <div>Price: {this.props.game.value.price}</div>
        </div>
      );
    } else {
      return (
        <div className='home__cardPrice'>
          <div className='card__regularPrice'>
            Old Price: {this.props.game.value.price}
          </div>
          <div className='card__salePrice'>
            Sale Price: {this.props.game.value.salePrice}
          </div>
        </div>
      );
    }
  }

  addToLocalStorage(data) {
    //function that adds items to localstorage
    const oldStorage = JSON.parse(localStorage.getItem('cart'));
    const newStorage = [];
    if (oldStorage !== null) {
      newStorage.push(...oldStorage);
    }
    newStorage.push(data);
    localStorage.setItem('cart', JSON.stringify(newStorage));
  }

  render() {
    return (
      <div>
        <Card className='home__card--size'>
          <CardImg
            top
            src={this.props.game.value.imgUrl}
            alt='Card image cap'
            className='cardImg'
          />
          <CardBody className='card__text'>
            <CardTitle>{this.props.game.value.name}</CardTitle>
            <CardSubtitle>Score: {this.props.game.value.score}</CardSubtitle>
            {this.renderPrices()}
            <Button
              tag={Link}
              to={'/game/' + this.props.game.key}
              className='home__cardBtn--margin'
            >
              View more
            </Button>
            <Button
              className='home__cardBtn--margin'
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

export default GameCard;
