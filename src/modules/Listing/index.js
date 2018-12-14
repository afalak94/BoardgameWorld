//Listing container
import React, { Component } from 'react';
import GameCard from '../../main/gameCard';
import { Col } from 'reactstrap';
import { bindActionCreators } from 'redux';
import firebase from '../../main/firebase.config';
import 'firebase/database';
import 'firebase/auth';
//import actions
import { addToCart } from '../Cart/actions';
import { addToStore } from '../../main/Redux/actions';
import { connect } from 'react-redux';

class Listing extends Component {
  constructor(props) {
    super(props);

    this.authListener = this.authListener.bind(this);
    this.state = {
      user: []
    };
  }

  componentWillMount() {
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
    });
  }

  componentDidMount() {
    this.authListener();
  }
  componentWillUnmount() {
    //stop listener for user authentication
    this.unsubscribe();
  }

  //listener for user authentication
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

  render() {
    return (
      <div className='listing__games'>
        {this.props.boardgames.map(game => {
          return (
            <Col xs='3' key={game.key}>
              <GameCard
                game={game}
                user={this.state.user}
                addToCart={this.props.addToCart}
              />
            </Col>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    boardgames: state.boardgames[state.boardgames.length - 1]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    //bind both action creators
    ...bindActionCreators({ addToStore, addToCart }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Listing);
