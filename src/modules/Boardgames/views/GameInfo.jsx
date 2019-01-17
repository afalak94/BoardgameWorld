import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { FirebaseDB } from '../../Firebase';
import styles from '../../../main/css/GameInfo.module.css';
import { Redirect } from 'react-router';
import { LocalStorageService } from '../../../main/services/LocalStorage';

class GameInfo extends Component {
  constructor(props) {
    super(props);

    //instantiate service objects
    this.LS = new LocalStorageService();
    this.FbDB = new FirebaseDB();
  }

  renderCategories = () => {
    //console.log(this.boardgame.value.category);
    return this.boardgame.value.category.map((category, index) => {
      return (
        <li className={styles['gameinfo__categoryItem']} key={index}>
          {category}
        </li>
      );
    });
  };

  renderPrice = () => {
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

  handleClick = () => {
    const { user } = this.props;
    user.uid !== 'guest'
      ? this.FbDB.addItemToUsersCart(this.boardgame, user)
      : this.LS.addToLocalStorage(this.boardgame);
  };

  render() {
    const { boardgames, match } = this.props;
    //redirect to /listing if redux store doesnt contain games yet
    if (!boardgames) {
      return <Redirect to='/listing' />;
    }
    //find the boardgame from redux store with the coresponding key
    boardgames.forEach(game => {
      if (game.key === match.params.id) {
        this.boardgame = game;
      }
    });

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
          <div className={styles['gameinfo__score']}>
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

function mapStateToProps(state) {
  return {
    user: state.user[0],
    boardgames: state.boardgames[0]
  };
}

export const GameInfoConn = connect(
  mapStateToProps,
  null
)(GameInfo);
