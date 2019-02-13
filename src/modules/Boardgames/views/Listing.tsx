// Listing container
import React, { Component, ReactNode, MouseEvent } from 'react';
import {
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  Breadcrumb,
  BreadcrumbItem
} from 'reactstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import anime from 'animejs';

import { FirebaseDB, FirebaseDBTypes } from '../../Firebase';
import { updateSearchTerm } from '../../Navigation';
import {
  selectCategory,
  selectPriceOrder,
  mainSelector,
  GameCard,
  CategoryInterface,
  Boardgame
} from '../index';
import { User } from '../../Authentication';
import { ReduxState } from '../../../main';
const styles = require('../../../main/css/Listing.module.css');

interface Props {
  dispatch: Dispatch;
  user: User;
  categories: CategoryInterface[];
  term: string;
  selectedCategory: string;
  priceFilter: string;
  selectedBoardgames(state: ReduxState): Boardgame | Boardgame[] | null;
}

class Listing extends Component<Props> {
  public FbDB: FirebaseDBTypes = new FirebaseDB({} as FirebaseDBTypes);
  public items: ReactNode;
  public categories: ReactNode;

  componentDidMount() {
    const { dispatch } = this.props;
    // save items to redux store
    this.FbDB.saveDataFromDBToStore('boardgames', dispatch);
    // save categories to redux store
    this.FbDB.saveDataFromDBToStore('categories', dispatch);
  }

  renderItems = (): ReactNode | null => {
    const { selectedBoardgames, user } = this.props;
    this.items = _.map(selectedBoardgames, (value, key) => {
      return (
        <Col xs='4' key={key}>
          <GameCard game={value} user={user} />
        </Col>
      );
    });
    if (!_.isEmpty(this.items)) {
      return this.items;
    }
    return null;
  };

  renderCategories = (): ReactNode | null => {
    const { categories } = this.props;
    this.categories = _.map(categories, (value, key) => {
      return (
        <ListGroupItem
          tag='button'
          action
          key={key}
          id={value.key as string}
          onClick={this.categoryClicked}
          data-category-value={value.value}
          className={`${styles['listing__categoryListItem']} cat-btns`}
        >
          {value.value}
        </ListGroupItem>
      );
    });
    if (!_.isEmpty(this.categories)) {
      return this.categories;
    }
    return null;
  };

  categoryClicked = (event: MouseEvent<HTMLElement>): void => {
    const { dispatch } = this.props;
    const { categoryValue } = event.currentTarget.dataset;
    const { id } = event.currentTarget;
    dispatch(selectCategory(categoryValue as string));

    const elements = document.querySelectorAll('.cat-btns');
    const target = document.getElementById(`${id}`);

    anime({
      targets: elements,
      marginLeft: 0,
      loop: false,
      easing: 'spring(1, 90, 50, 10)'
    });

    anime({
      targets: target,
      marginLeft: 20,
      loop: false,
      easing: 'spring(1, 90, 50, 10)'
    });
  };

  handlePriceClick = (event: MouseEvent<HTMLElement>): void => {
    const { dispatch } = this.props;
    const { type } = event.currentTarget.dataset;
    dispatch(selectPriceOrder(type as string));
  };

  handleFiltersClick = (): void => {
    const { dispatch } = this.props;
    dispatch(selectCategory(''));
    dispatch(selectPriceOrder(''));
    dispatch(updateSearchTerm(''));

    const elements = document.querySelectorAll('.cat-btns');
    anime({
      targets: elements,
      marginLeft: 0,
      loop: false,
      easing: 'spring(1, 90, 50, 10)'
    });
  };

  render() {
    const { term, selectedCategory, priceFilter } = this.props;
    return (
      <Row>
        <Col xs='3'>
          <ListGroup className={styles['listing__categories']}>
            <ListGroupItem
              className={styles['listing__categoryListItem']}
              tag='button'
              action
              data-category-value=''
              onClick={this.categoryClicked}
            >
              All categories
            </ListGroupItem>
            {this.renderCategories()}
          </ListGroup>
        </Col>

        <Col xs='9'>
          <div className={styles['listing__filters']}>
            <Button
              outline
              className={styles['listing__clearBtn']}
              onClick={this.handleFiltersClick}
            >
              &times;
            </Button>
            <Breadcrumb tag='nav' className={styles['listing__breadcrumb']}>
              <BreadcrumbItem tag='span'>Search: {term}</BreadcrumbItem>
              <BreadcrumbItem tag='span'>
                Category: {selectedCategory}
              </BreadcrumbItem>
              <BreadcrumbItem tag='span'>Price: {priceFilter}</BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div>
            <InputGroup className={styles['listing__priceBtnGroup']}>
              <Button
                className={styles['listing__filterBtn']}
                onClick={this.handlePriceClick}
                data-type='asc'
              >
                Price Asc
              </Button>
              <Button
                className={styles['listing__filterBtn']}
                onClick={this.handlePriceClick}
                data-type='desc'
              >
                Price Desc
              </Button>
            </InputGroup>
          </div>
          <div className={styles['listing__games']}>{this.renderItems()}</div>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state: ReduxState) {
  return {
    user: state.user[0],
    categories: state.categories,
    selectedBoardgames: mainSelector(state),
    term: state.searchTerm,
    selectedCategory: state.selectedCategory,
    priceFilter: state.price
  };
}

export const ListingConn = connect(
  mapStateToProps,
  (dispatch: Dispatch) => {
    return { dispatch };
  }
)(Listing);
