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
import { FirebaseDB } from '../../Firebase';
import _ from 'lodash';
import { connect } from 'react-redux';
import { nameSelector } from '../index';
import { updateSearchTerm } from '../../Navigation';
import { onCategoryClick, onPriceClick } from '../index';
import styles from '../../../main/css/Listing.module.css';

class Listing extends Component {
  constructor(props) {
    super(props);

    //create instance of firebase database service
    this.FbDB = new FirebaseDB();
  }

  componentDidMount() {
    //save items to redux store
    // this.FbDB.saveItemsFromDBToStore(this.props.addToStore);
    this.FbDB.saveDataFromDBToStore('boardgames', this.props.dispatch);

    //save categories to redux store
    // this.FbDB.saveCategoriesFromDBToStore(this.props.addCategories);
    this.FbDB.saveDataFromDBToStore('categories', this.props.dispatch);
  }

  renderItems = () => {
    //console.log(this.props.selectedBoardgames);
    const { selectedBoardgames } = this.props;
    this.items = _.map(selectedBoardgames, (value, key) => {
      return (
        <Col xs='4' key={key}>
          <GameCard
            game={value}
            user={this.props.user}
            dispatch={this.props.dispatch}
          />
        </Col>
      );
    });
    if (!_.isEmpty(this.items)) {
      return this.items;
    }
  };

  renderCategories = () => {
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
  };

  categoryClicked = event => {
    const { categoryValue } = event.target.dataset;
    document.getElementById('searchBar').value = '';
    this.props.dispatch(updateSearchTerm(''));
    this.props.dispatch(onCategoryClick(categoryValue));
  };

  allCategoriesClick = () => {
    this.componentDidMount();
    document.getElementById('searchBar').value = '';
  };

  handlePriceClick = event => {
    const { type } = event.target.dataset;
    this.props.dispatch(onPriceClick(type));
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
    boardgames: state.boardgames[0],
    user: state.user[0],
    categories: state.categories,
    selectedBoardgames: nameSelector(state)
  };
}

export const ListingConn = connect(
  mapStateToProps,
  dispatch => {
    return { dispatch };
  }
)(Listing);
