import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart } from '../../modules/Firebase';
import styles from '../css/GameInfo.module.css';
import { Redirect } from 'react-router';
import { LocalStorageService } from '../services/LocalStorage';

class GameInfo extends Component {
  constructor(props) {
    super(props);

    this.renderCategories = this.renderCategories.bind(this);
    this.renderPrice = this.renderPrice.bind(this);

    //instantiate LocalStorageService object
    this.LS = new LocalStorageService();
  }

  handleClick = () => {
    this.props.user
      ? //if the user is loged in, add item to his firebase cart
        this.props.addToCart(this.props.game, this.props.user)
      : //if its not, add item to local storage
        this.LS.addToLocalStorage(this.props.game);
  };

  renderCategories() {
    //console.log(this.boardgame.value.category);
    return this.boardgame.value.category.map((category, index) => {
      return (
        <li className={styles['gameinfo__categoryItem']} key={index}>
          {category}
        </li>
      );
    });
  }

  renderPrice() {
    //console.log(this.boardgame.value.onSale);
    if (this.boardgame.value.onSale === false) {
      return (
        <div className={styles['gameinfo__price']}>
          Price: {this.boardgame.value.price} $
        </div>
      );
    } else {
      return (
        <div className={styles['gameinfo__price']}>
          <div className={styles['gameinfo__oldPrice']}>
            Old price: {this.boardgame.value.price} $
          </div>
          <div>SALE: {this.boardgame.value.salePrice} $</div>
        </div>
      );
    }
  }

  render() {
    //redirect to /listing if redux store doesnt contain games yet
    if (!this.props.boardgames) {
      return <Redirect to='/listing' />;
    } else {
      //find the boardgame from redux store with the coresponding key
      this.props.boardgames.forEach(game => {
        if (game.key === this.props.match.params.id) {
          this.boardgame = game;
        }
      });
    }

    return (
      <div className={styles['gameinfo__wrapper']}>
        <div className={styles['gameinfo__imgContainer']}>
          <img
            className={styles['gameinfo__img']}
            src={this.boardgame.value.imgUrl}
            alt='info'
          />
        </div>

        <div className={styles['gameinfo__info']}>
          <div className={styles['gameinfo__name']}>
            {this.boardgame.value.name}
            <div className={styles['gameinfo__categories']}>
              <ul>{this.renderCategories()}</ul>
            </div>
          </div>
          <div className={styles['gameinfo__score']}>
            <div className={styles['gameinfo__scoreNum']}>
              {this.boardgame.value.score}
            </div>
          </div>
        </div>

        <div className={styles['gameinfo__description']}>
          <h4>{this.boardgame.value.description}</h4>
        </div>

        <div className={styles['gameinfo__buy']}>
          {this.renderPrice()}
          <Button
            color='success'
            onClick={
              this.props.user
                ? () => this.props.addToCart(this.boardgame, this.props.user)
                : () => this.LS.addToLocalStorage(this.boardgame)
            }
          >
            Add to Cart
          </Button>
        </div>
      </div>
    );
  }
}

//connect to redux store cart and enable addToCart function
function mapStateToProps(state) {
  return {
    user: state.user[0],
    boardgames: state.boardgames[state.boardgames.length - 1]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    //bind both action creators
    ...bindActionCreators({ addToCart }, dispatch)
  };
}

export const GameInfoConn = connect(
  mapStateToProps,
  mapDispatchtoProps
)(GameInfo);
