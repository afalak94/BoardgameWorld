import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeitem, addToCart } from '../Cart/actions';
import firebase from '../../main/firebase.config';
import 'firebase/auth';
import styles from './GameInfo.module.css';

class GameInfo extends Component {
  constructor(props) {
    super(props);

    this.authListener = this.authListener.bind(this);

    //find the boardgame from redux store with the coresponding key
    this.props.boardgames.forEach(game => {
      if (game.key === this.props.match.params.id) {
        this.boardgame = game;
      }
    });

    this.state = {
      user: []
    };
    //console.log(this.boardgame);
  }

  componentDidMount() {
    this.authListener();
  }
  componentWillUnmount() {
    //stop listener for user authentication
    this.unsubscribe();
  }

  authListener() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(() => {
          return { user };
        });
      } else {
        this.setState({ user: null });
      }
    });
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
      <div className={styles['gameinfo__wrapper']}>
        <div className={styles['gameinfo__img--size']}>
          <img
            className='img-fluid'
            src={this.boardgame.value.imgUrl}
            alt='info'
          />
        </div>

        <div className={styles['gameinfo__info']}>
          <h2>{this.boardgame.value.name}</h2>
          <h4>Score: {this.boardgame.value.score}</h4>
          <h4>Price: {this.boardgame.value.price}</h4>
          <p>{this.boardgame.value.description}</p>
          <Button
            onClick={
              this.state.user
                ? () => this.props.addToCart(this.boardgame, this.state.user)
                : () => this.addToLocalStorage(this.boardgame)
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
    boardgames: state.boardgames[state.boardgames.length - 1]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    //bind both action creators
    ...bindActionCreators({ addToCart, removeitem }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(GameInfo);
