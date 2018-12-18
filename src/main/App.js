import React, { Component } from 'react';
import './App.css';
import GameCard from './gameCard';
import SaleCarousel from './carousel';
import { Col } from 'reactstrap';
import { connect } from 'react-redux';
import firebase from './firebase.config';
import 'firebase/database';
import 'firebase/auth';
//import store from './store';
import { bindActionCreators } from 'redux';
//import actions
import { addToCart } from '../modules/Cart/actions';
import { addToStore, updateStore } from './Redux/actions';
import { addUser } from '../modules/Login/actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.authListener = this.authListener.bind(this);
    this.state = { itemsOnSale: [], user: {} };
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

    //listener for firebase authentication
    this.authListener();
  }

  //listener for user authentication
  authListener() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // this.setState(() => {
        //   return { user };
        // });
        this.props.addUser(user);
      } else {
        // this.setState({ user: null });
      }
      // console.log(this.props.user);
    });
  }

  componentWillUnmount() {
    //destroy listeners for database and authentication
    this.database.off();
    this.unsubscribe();
  }

  render() {
    return (
      <div>
        <div className='home__carousel'>
          <SaleCarousel />
        </div>

        <div className='listing__games'>
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
    ...bindActionCreators(
      { addToStore, addToCart, updateStore, addUser },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(App);
