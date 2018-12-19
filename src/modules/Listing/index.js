//Listing container
import React, { Component } from 'react';
import GameCard from '../../main/gameCard';
import { Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import { bindActionCreators } from 'redux';
import firebase from '../../main/firebase.config';
import 'firebase/database';
import 'firebase/auth';
//import actions
import { addToCart } from '../Cart/actions';
import { addToStore } from '../../main/Redux/actions';
import { connect } from 'react-redux';
import { addUser } from '../../modules/Login/actions';
import _ from 'lodash';
import { allBoardgames, categorySelector } from './selectors';

class Listing extends Component {
  constructor(props) {
    super(props);

    this.authListener = this.authListener.bind(this);
    this.state = { categories: [], selectedCategory: '' };
  }

  componentDidMount() {
    //get all games from firebase database
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

    //get all categories from firebase database
    this.categories = firebase.database().ref('categories/');
    this.categories.on('value', snap => {
      //save categories data as array of objects with key-value pairs
      let data = [];
      snap.forEach(ss => {
        data.push({ key: ss.key, value: ss.val() });
      });
      this.setState({
        categories: data
      });
      // console.log(data);
      // console.log(this.state.categories);
    });

    this.authListener();
    console.log(this.props.results);
  }

  componentWillUnmount() {
    //stop listener for user authentication
    this.unsubscribe();
  }

  //listener for user authentication
  authListener() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.addUser(user);
      } else {
        //do nothing
      }
    });
  }

  renderItems() {
    const { boardgames } = this.props;
    this.items = _.map(boardgames, (value, key) => {
      return (
        <Col xs='4' key={key}>
          <GameCard
            game={value}
            user={this.props.user}
            addToCart={this.props.addToCart}
          />
        </Col>
      );
    });
    if (!_.isEmpty(this.items)) {
      return this.items;
    }
  }

  renderCategories() {
    return this.state.categories.map(category => {
      return (
        <ListGroupItem
          tag='button'
          action
          key={category.key}
          //onClick={() => this.props.fetchCategoryItems(category.value)}
        >
          {category.value}
        </ListGroupItem>
      );
    });
  }

  render() {
    return (
      <Row>
        <Col xs='3'>
          <ListGroup className='listing__categories'>
            <ListGroupItem tag='button' action>
              All categories
            </ListGroupItem>
            {this.renderCategories()}
          </ListGroup>
        </Col>

        <Col xs='9'>
          <div className='listing__games'>{this.renderItems()}</div>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    boardgames: allBoardgames(state),
    user: state.user[0]
    //results: categorySelector(state)
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    //bind both action creators
    ...bindActionCreators({ addToStore, addToCart, addUser }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Listing);
