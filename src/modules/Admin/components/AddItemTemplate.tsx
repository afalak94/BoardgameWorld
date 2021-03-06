import React, { Component, ChangeEvent, SyntheticEvent } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import { FirebaseDB, FirebaseDBTypes } from '../../Firebase';
import { CategoryInterface } from '../../Boardgames';

import { MyToggler } from './MyToggler';
const styles = require('../../../main/css/Admin.module.css');

interface Props {
  categories: CategoryInterface[];
}

interface State {
  nameValue?: string;
  scoreValue?: string;
  imgUrlValue?: string;
  priceValue?: string;
  salePriceValue?: string;
  onSale: boolean;
  descriptionValue?: string;
  dropdownValue1?: string;
  dropdownValue2?: string;
  dropdownValue3?: string;
  dropdownOpen1?: boolean;
  dropdownOpen2: boolean;
  dropdownOpen3: boolean;
}

export default class AddItemTemplate extends Component<Props, State> {
  public FbDB: FirebaseDBTypes = new FirebaseDB({} as FirebaseDBTypes);

  constructor(props: Props) {
    super(props);

    this.state = {
      dropdownOpen1: false,
      dropdownOpen2: false,
      dropdownOpen3: false,
      onSale: false
    };
  }

  handleSubmit = () => {
    const {
      nameValue,
      scoreValue,
      imgUrlValue,
      priceValue,
      salePriceValue,
      onSale,
      descriptionValue,
      dropdownValue1,
      dropdownValue2,
      dropdownValue3
    } = this.state;
    // firebase service method
    this.FbDB.addNewItem(
      nameValue,
      scoreValue,
      imgUrlValue,
      priceValue,
      salePriceValue,
      onSale,
      descriptionValue,
      [dropdownValue1 || '', dropdownValue2 || '', dropdownValue3 || '']
    );
  };

  commonChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { type, name, checked, value } = event.currentTarget;
    if (type === 'checkbox') {
      this.setState({
        [name]: checked
      } as Pick<State, 'onSale'>);
      return;
    }
    this.setState({
      [name]: value
    } as Pick<State, 'nameValue' | 'scoreValue' | 'imgUrlValue' | 'priceValue' | 'salePriceValue' | 'descriptionValue'>);
  };

  // function that changes menu toggler text when the category is selected
  dropdownSelectValue = (event: SyntheticEvent<any>) => {
    const { category, dropdown, value } = event.currentTarget.dataset;
    this.setState({
      [dropdown]: !this.state[dropdown],
      [value]: category
    } as Pick<State, keyof State>);
  };

  // combined toggler for three dropdown buttons, they are wraped inside MyToggler component
  // because data atributes do not work with some reactstrap elements like this one
  dropdownToggle = (id: string) => {
    this.setState({
      [id]: !this.state[id]
    } as Pick<State, 'dropdownOpen1' | 'dropdownOpen2' | 'dropdownOpen3'>);
  };

  // reactstrap component ButtonDropdown requires to have toggle atribute, but it has a value of
  // doNothing. Togglers are instead combined with wrapper component MyToggler that use dropdownToggle
  doNothing = () => {};

  render() {
    return (
      <Form className={styles['item__form']} id='addItem'>
        <h3>Add new boardgame</h3>
        <FormGroup className={styles['form__name']}>
          <Label>Name</Label>
          <Input name='nameValue' type='text' onChange={this.commonChange} />
        </FormGroup>

        <FormGroup className={styles['form__score']}>
          <Label>Score</Label>

          <Input name='scoreValue' type='text' onChange={this.commonChange} />
        </FormGroup>

        <FormGroup className={styles['form__img']}>
          <Label>Image URL</Label>

          <Input name='imgUrlValue' type='text' onChange={this.commonChange} />
        </FormGroup>

        <FormGroup className={styles['form__price']}>
          <Label>Price</Label>
          <Input
            name='priceValue'
            type='text'
            onChange={this.commonChange}
            style={{ float: 'left' }}
          />
        </FormGroup>

        <FormGroup className={styles['form__salePrice']}>
          <Label>Sale price</Label>

          <Input
            name='salePriceValue'
            type='text'
            onChange={this.commonChange}
            style={{ float: 'left' }}
          />
        </FormGroup>

        <FormGroup className={styles['form__onSale']}>
          <Label>Is item on SALE?</Label>
          <FormGroup check>
            <Label check>
              <Input
                type='checkbox'
                name='onSale'
                onChange={this.commonChange}
              />{' '}
              Check if item is on SALE
            </Label>
          </FormGroup>
        </FormGroup>

        <FormGroup className={styles['form__description']}>
          <Label for='exampleText'>Description</Label>
          <Input
            type='textarea'
            name='descriptionValue'
            onChange={this.commonChange}
          />
        </FormGroup>

        {/* 3 categories togglers */}
        <FormGroup className={styles['form__categories']}>
          <Label>Categories</Label>

          <MyToggler onClick={this.dropdownToggle} id='dropdownOpen1'>
            <ButtonDropdown
              isOpen={this.state.dropdownOpen1}
              toggle={this.doNothing}
            >
              <DropdownToggle caret outline>
                {this.state.dropdownValue1}
              </DropdownToggle>
              <DropdownMenu className={styles['form__categories__menu']}>
                {this.props.categories.map(cat => {
                  return (
                    <DropdownItem
                      onClick={this.dropdownSelectValue}
                      data-category={cat.value}
                      data-dropdown='dropdownOpen1'
                      data-value='dropdownValue1'
                      key={cat.key as string}
                    >
                      {cat.value}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </ButtonDropdown>
          </MyToggler>

          <MyToggler onClick={this.dropdownToggle} id='dropdownOpen2'>
            <ButtonDropdown
              isOpen={this.state.dropdownOpen2}
              toggle={this.doNothing}
            >
              <DropdownToggle caret outline>
                {this.state.dropdownValue2}
              </DropdownToggle>
              <DropdownMenu className={styles['form__categories__menu']}>
                {this.props.categories.map(cat => {
                  return (
                    <DropdownItem
                      onClick={this.dropdownSelectValue}
                      key={cat.key as string}
                      data-category={cat.value}
                      data-dropdown='dropdownOpen2'
                      data-value='dropdownValue2'
                    >
                      {cat.value}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </ButtonDropdown>
          </MyToggler>

          <MyToggler onClick={this.dropdownToggle} id='dropdownOpen3'>
            <ButtonDropdown
              isOpen={this.state.dropdownOpen3}
              toggle={this.doNothing}
            >
              <DropdownToggle caret outline>
                {this.state.dropdownValue3}
              </DropdownToggle>
              <DropdownMenu className={styles['form__categories__menu']}>
                {this.props.categories.map(cat => {
                  return (
                    <DropdownItem
                      onClick={this.dropdownSelectValue}
                      key={cat.key as string}
                      data-category={cat.value}
                      data-dropdown='dropdownOpen3'
                      data-value='dropdownValue3'
                    >
                      {cat.value}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </ButtonDropdown>
          </MyToggler>
        </FormGroup>

        <FormGroup className={styles['form__submit']}>
          <Button
            color='success'
            // passing all values to addNewItem function from props
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </FormGroup>
      </Form>
    );
  }
}
