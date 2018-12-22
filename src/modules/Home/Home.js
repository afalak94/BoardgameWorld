import React, { Component } from 'react';
import GameCard from '../GameCard/gameCard';
import SaleCarousel from './carousel';
import { Col } from 'reactstrap';
import { connect } from 'react-redux';
import firebase from '../../main/firebase.config';
import 'firebase/database';
import { bindActionCreators } from 'redux';
//import actions
import { addToCart } from '../Cart/actions';
import { addToStore, updateStore } from '../../main/Redux/actions';
import styles from './Home.module.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { itemsOnSale: [] };
  }

  componentDidMount() {
    //get all games from database
    this.database = firebase.database().ref('boardgames/');
    this.database.on('value', snap => {
      //save item data as array of objects with key-value pairs
      let data = [];
      snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      //copy boardgames from firebase to redux store
      this.props.addToStore(data);

      //set state with boardgames that are on sale
      let itemsOnSale = [];
      data.forEach(item => {
        if (item.value.onSale === true) {
          itemsOnSale.push(item);
        }
      });
      this.setState({
        itemsOnSale: itemsOnSale
      });
    });
  }

  componentWillUnmount() {
    //destroy listeners for database and authentication
    this.database.off();
  }

  render() {
    return (
      <div>
        <div className={styles['home__carousel']}>
          <SaleCarousel />
        </div>

        <div className={styles['saleGames']}>
          {this.state.itemsOnSale.map(game => {
            return (
              <Col xs='3' key={game.key}>
                <GameCard
                  game={game}
                  user={this.props.user}
                  addToCart={this.props.addToCart}
                />
              </Col>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
    boardgames: state.boardgames,
    user: state.user[0]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    //bind both action creators
    ...bindActionCreators({ addToStore, addToCart, updateStore }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Home);
