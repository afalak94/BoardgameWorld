import React, { Component } from 'react';
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
import { FirebaseDB } from '../../Firebase';
import { MyToggler } from './MyToggler';
import styles from '../../../main/css/Admin.module.css';

export default class AddItemTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen1: false,
      dropdownOpen2: false,
      dropdownOpen3: false,
      onSale: false
    };

    this.FbDB = new FirebaseDB();
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
    //firebase service method
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

  commonChange = event => {
    const { type, name, checked, value } = event.target;
    if (type === 'checkbox') {
      this.setState({
        [name]: checked
      });
      return;
    }
    this.setState({
      [name]: value
    });
  };

  //function that changes menu toggler text when the category is selected
  dropdownSelectValue = event => {
    const { category, dropdown, value } = event.target.dataset;
    this.setState({
      [dropdown]: !this.state[dropdown],
      [value]: category
    });
  };

  //combined toggler for three dropdown buttons, they are wraped inside MyToggler component
  //because data atributes do not work with some reactstrap elements like this one
  dropdownToggle = id => {
    this.setState({
      [id]: !this.state[id]
    });
  };

  //reactstrap component ButtonDropdown requires to have toggle atribute, but it has a value of
  //doNothing. Togglers are instead combined with wrapper component MyToggler that use dropdownToggle
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
                      key={cat.key}
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
                      key={cat.key}
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
                      key={cat.key}
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
            //passing all values to addNewItem function from props
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </FormGroup>
      </Form>
    );
  }
}
