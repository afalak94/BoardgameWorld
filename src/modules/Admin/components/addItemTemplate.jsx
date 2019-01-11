import React from 'react';
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
import styles from '../../../main/css/Admin.module.css';

export default class AddItemTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen1: false,
      dropdownOpen2: false,
      dropdownOpen3: false,
      onSale: false
    };
  }

  handleSubmit = () => {
    if (
      !this.state.nameValue ||
      !this.state.scoreValue ||
      !this.state.imgUrlValue ||
      !this.state.priceValue ||
      !this.state.salePriceValue ||
      !this.state.descriptionValue ||
      !this.state.dropdownValue1 ||
      !this.state.dropdownValue2 ||
      !this.state.dropdownValue3
    ) {
      alert('All fields are required');
    } else {
      this.props.addNewItem(
        this.state.nameValue,
        this.state.scoreValue,
        this.state.imgUrlValue,
        this.state.priceValue,
        this.state.salePriceValue,
        this.state.onSale,
        this.state.descriptionValue,
        [
          this.state.dropdownValue1,
          this.state.dropdownValue2,
          this.state.dropdownValue3
        ]
      );
    }
  };

  commonChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onSaleChange = event => {
    this.setState({
      [event.target.name]: event.target.checked
    });
  };

  //toggle functions for each category dropdown menu
  dropdownToggle1 = () => {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1
    });
  };
  dropdownToggle2 = () => {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
  };
  dropdownToggle3 = () => {
    this.setState({
      dropdownOpen3: !this.state.dropdownOpen3
    });
  };

  //functions that change menu toggler text when the category is selected
  dropdownSelect1 = event => {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1,
      dropdownValue1: event.target.innerText
    });
  };
  dropdownSelect2 = event => {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2,
      dropdownValue2: event.target.innerText
    });
  };
  dropdownSelect3 = event => {
    this.setState({
      dropdownOpen3: !this.state.dropdownOpen3,
      dropdownValue3: event.target.innerText
    });
  };

  render() {
    return (
      <Form className={styles['item__form']}>
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
            onChange={this.commonChange}
            style={{ float: 'left' }}
          />
        </FormGroup>

        <FormGroup className={styles['form__salePrice']}>
          <Label>Sale price</Label>

          <Input
            name='salePriceValue'
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
                onChange={this.onSaleChange}
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

          <ButtonDropdown
            isOpen={this.state.dropdownOpen1}
            toggle={this.dropdownToggle1}
          >
            <DropdownToggle caret outline>
              {this.state.dropdownValue1}
            </DropdownToggle>
            <DropdownMenu className={styles['form__categories__menu']}>
              {this.props.categories.map(cat => {
                return (
                  <DropdownItem onClick={this.dropdownSelect1} key={cat.key}>
                    {cat.value}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </ButtonDropdown>

          <ButtonDropdown
            isOpen={this.state.dropdownOpen2}
            toggle={this.dropdownToggle2}
          >
            <DropdownToggle caret outline>
              {this.state.dropdownValue2}
            </DropdownToggle>
            <DropdownMenu className={styles['form__categories__menu']}>
              {this.props.categories.map(cat => {
                return (
                  <DropdownItem onClick={this.dropdownSelect2} key={cat.key}>
                    {cat.value}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </ButtonDropdown>

          <ButtonDropdown
            isOpen={this.state.dropdownOpen3}
            toggle={this.dropdownToggle3}
          >
            <DropdownToggle caret outline>
              {this.state.dropdownValue3}
            </DropdownToggle>
            <DropdownMenu className={styles['form__categories__menu']}>
              {this.props.categories.map(cat => {
                return (
                  <DropdownItem onClick={this.dropdownSelect3} key={cat.key}>
                    {cat.value}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </ButtonDropdown>
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
