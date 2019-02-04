import React, {
  Component,
  ReactNode,
  ChangeEvent,
  SyntheticEvent
} from 'react';
import { Dispatch } from 'redux';
import _ from 'lodash';
import { Row, Col, Input, Button } from 'reactstrap';

import { FirebaseDB, FirebaseDBTypes } from '../../Firebase';
import { CategoryInterface } from '../../Boardgames';
const styles = require('../../../main/css/Admin.module.css');

interface Props {
  categories: CategoryInterface[];
  dispatch: Dispatch;
}

interface State {
  inputValue: string;
}

export default class CategoryList extends Component<Props, State> {
  public FbDB: FirebaseDBTypes;
  public categories: ReactNode;

  constructor(props: Props) {
    super(props);

    this.state = { inputValue: '' };
    this.FbDB = new FirebaseDB(null);
  }

  componentDidMount() {
    this.FbDB.saveDataFromDBToStore('categories', this.props.dispatch);
  }

  updateInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleClick = (event: SyntheticEvent<HTMLButtonElement>): void => {
    const { categoryKey } = event.currentTarget.dataset;
    // removing category from firebase by using key
    this.FbDB.deleteCategory(categoryKey as string);
  };

  handleSubmit = (): void => {
    this.FbDB.addCategory(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  renderCategories = (): ReactNode | null => {
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
    return null;
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
