//Listing container
import React, { Component } from 'react';
import GameCard from '../GameCard/gameCard';
import {
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import firebase from '../../main/firebase.config';
import 'firebase/database';
import 'firebase/auth';
import _ from 'lodash';
//import actions
import { addToCart } from '../Cart/actions';
import { addToStore } from '../../main/Redux/actions';
import { connect } from 'react-redux';
import { addUser } from '../../modules/Login/actions';
import { onCategoryClick, onPriceClick } from './actions';
import styles from './Listing.module.css';

class Listing extends Component {
  constructor(props) {
    super(props);

    this.authListener = this.authListener.bind(this);
    this.categoryClicked = this.categoryClicked.bind(this);
    this.state = { categories: [] };
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
          onClick={() => this.categoryClicked(category.value)}
          className={styles['listing__categoryListItem']}
        >
          {category.value}
        </ListGroupItem>
      );
    });
  }

  //clear search bar text
  categoryClicked(category) {
    document.getElementById('searchBar').value = '';
    this.props.onCategoryClick(category);
  }

  render() {
    return (
      <Row>
        <Col xs='3'>
          <ListGroup className={styles['listing__categories']}>
            <ListGroupItem
              className={styles['listing__categoryListItem']}
              tag='button'
              action
              onClick={() => {
                this.componentDidMount();
                document.getElementById('searchBar').value = '';
              }}
            >
              All categories
            </ListGroupItem>
            {this.renderCategories()}
          </ListGroup>
        </Col>

        <Col xs='9'>
          <div>
            <InputGroup className={styles['listing__priceBtnGroup']}>
              <InputGroupAddon
                className={styles['listing__priceBtn']}
                addonType='prepend'
              >
                Price
              </InputGroupAddon>
              <Button
                className={styles['listing__filterBtn']}
                onClick={() => this.props.onPriceClick('ASC')}
              >
                Asc
              </Button>
              <Button
                className={styles['listing__filterBtn']}
                onClick={() => this.props.onPriceClick('DESC')}
              >
                Desc
              </Button>
            </InputGroup>
          </div>
          <div className={styles['listing__games']}>{this.renderItems()}</div>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    boardgames: state.boardgames[state.boardgames.length - 1],
    user: state.user[0]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    ...bindActionCreators(
      { addToStore, addToCart, addUser, onCategoryClick, onPriceClick },
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Listing);
