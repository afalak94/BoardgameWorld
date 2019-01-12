//Listing container
import React, { Component } from 'react';
import { GameCard } from '../../../main/views';
import {
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import { FirebaseDB } from '../../Firebase';
import firebase from '../../Firebase/firebase.config';
import 'firebase/database';
import _ from 'lodash';
//import actions
import { addToCart } from '../../Cart';
import { connect } from 'react-redux';
import { onCategoryClick, onPriceClick, addToStore } from '../index';
import styles from '../../../main/css/Listing.module.css';

class Listing extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };

    this.FbDB = new FirebaseDB();
  }

  componentDidMount() {
    /* TRANSFER TO FIREBASEDATABASE */

    this.FbDB.saveItemsFromDBToStore(this.props.addToStore);

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
    });

    // console.log(this.FbDB.getCategoriesFromDB());
    // this.setState(() => {
    //   const data = this.FbDB.getCategoriesFromDB();
    //   return { categories: data };
    // });
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
          onClick={this.categoryClicked}
          data-category-value={category.value}
          className={styles['listing__categoryListItem']}
        >
          {category.value}
        </ListGroupItem>
      );
    });
  }

  //clear search bar text
  categoryClicked = event => {
    const { categoryValue } = event.target.dataset;
    document.getElementById('searchBar').value = '';
    this.props.onCategoryClick(categoryValue);
  };

  allCategoriesClick = () => {
    this.componentDidMount();
    document.getElementById('searchBar').value = '';
  };

  handlePriceClick = event => {
    const { type } = event.target.dataset;
    this.props.onPriceClick(type);
  };

  render() {
    return (
      <Row>
        <Col xs='3'>
          <ListGroup className={styles['listing__categories']}>
            <ListGroupItem
              className={styles['listing__categoryListItem']}
              tag='button'
              action
              onClick={this.allCategoriesClick}
            >
              All categories
            </ListGroupItem>
            {this.renderCategories()}
          </ListGroup>
        </Col>

        <Col xs='9'>
          <div>
            <InputGroup className={styles['listing__priceBtnGroup']}>
              <div className={styles['listing__priceText']}>Price</div>
              <Button
                className={styles['listing__filterBtn']}
                onClick={this.handlePriceClick}
                data-type='ASC'
              >
                Asc
              </Button>
              <Button
                className={styles['listing__filterBtn']}
                onClick={this.handlePriceClick}
                data-type='DESC'
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
      { addToStore, addToCart, onCategoryClick, onPriceClick },
      dispatch
    )
  };
}

export const ListingConn = connect(
  mapStateToProps,
  mapDispatchtoProps
)(Listing);
