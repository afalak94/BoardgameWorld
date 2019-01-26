import React, { Component } from 'react';
import { FirebaseDB } from '../../Firebase';
import _ from 'lodash';
import { Row, Col, Input, Button } from 'reactstrap';
import styles from '../../../main/css/Admin.module.css';

export default class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: '' };
    this.FbDB = new FirebaseDB();
  }

  componentDidMount() {
    this.FbDB.saveDataFromDBToStore('categories', this.props.dispatch);
  }

  updateInputValue = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleClick = event => {
    const { categoryKey } = event.target.dataset;
    //removing category from firebase by using key
    this.FbDB.deleteCategory(categoryKey);
  };

  handleSubmit = () => {
    this.FbDB.addCategory(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  renderCategories = () => {
    const { categories } = this.props;
    this.categories = _.map(categories, (value, key) => {
      return (
        <div className={styles['categories__item']} key={key}>
          <div className={styles['categories__itemName']}>{value.value}</div>

          <div className={styles['categories__itemRemove']}>
            <Button data-category-key={value.key} onClick={this.handleClick}>
              &times;
            </Button>
          </div>
        </div>
      );
    });
    if (!_.isEmpty(this.categories)) {
      return this.categories;
    }
  };

  render() {
    return (
      <Row style={{ width: 1500 }}>
        <Col sm={{ size: 'auto' }}>
          <div className={styles['categories__wrapper']}>
            {this.renderCategories()}
          </div>
        </Col>

        <Col sm={{ size: 'auto' }}>
          <div className={styles['category__input__wrapper']}>
            <h3>Add a new category</h3>
            <p>(max. 18 letters)</p>
            <Input
              value={this.state.inputValue}
              onChange={this.updateInputValue}
            />
            <Button color='success' onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}
