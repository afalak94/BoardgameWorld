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
import { FirebaseDB, addToCart } from '../../Firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import {
  onCategoryClick,
  onPriceClick,
  addToStore,
  addCategories
} from '../index';
import styles from '../../../main/css/Listing.module.css';

class Listing extends Component {
  constructor(props) {
    super(props);

    //create instance of firebase database service
    this.FbDB = new FirebaseDB();
  }

  componentDidMount() {
    //save items to redux store
    this.FbDB.saveItemsFromDBToStore(this.props.addToStore);

    //save categories to redux store
    this.FbDB.saveCategoriesFromDBToStore(this.props.addCategories);
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
    const { categories } = this.props;
    this.categories = _.map(categories, (value, key) => {
      return (
        <ListGroupItem
          tag='button'
          action
          key={key}
          onClick={this.categoryClicked}
          data-category-value={value.value}
          className={styles['listing__categoryListItem']}
        >
          {value.value}
        </ListGroupItem>
      );
    });
    if (!_.isEmpty(this.categories)) {
      return this.categories;
    }
  }

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
    user: state.user[0],
    categories: state.categories
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    ...bindActionCreators(
      { addToStore, addToCart, onCategoryClick, onPriceClick, addCategories },
      dispatch
    )
  };
}

export const ListingConn = connect(
  mapStateToProps,
  mapDispatchtoProps
)(Listing);
