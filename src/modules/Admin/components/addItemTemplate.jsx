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
import { FirebaseDB } from '../../Firebase';
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

    this.FbDB = new FirebaseDB();
  }

  handleSubmit = () => {
    //firebase service method
    this.FbDB.addNewItem(
      this.state.nameValue,
      this.state.scoreValue,
      this.state.imgUrlValue,
      this.state.priceValue,
      this.state.salePriceValue,
      this.state.onSale,
      this.state.descriptionValue,
      [
        this.state.dropdownValue1 || '',
        this.state.dropdownValue2 || '',
        this.state.dropdownValue3 || ''
      ]
    );
  };

  commonChange = event => {
    const { type } = event.target;
    if (type === 'checkbox') {
      this.setState({
        [event.target.name]: event.target.checked
      });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  //function that changes menu toggler text when the category is selected
  dropdownSelect = event => {
    const { category, dropdown, value } = event.target.dataset;
    this.setState({
      [dropdown]: !this.state[dropdown],
      [value]: category
    });
  };

  //TODO: learn how to combine handlers into sigle function, data atributes do not
  //work, probably because of reactstrap elements again
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

  // dropdownToggle = event => {
  //   const { name } = event.target.dataset;
  //   console.log(name);
  //   this.setState({
  //     [name]: !this.state[name]
  //   });
  // };

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

          <ButtonDropdown
            isOpen={this.state.dropdownOpen1}
            toggle={this.dropdownToggle1}
            // data-name='dropdownOpen1' //unable to pass dataset info
          >
            <DropdownToggle caret outline>
              {this.state.dropdownValue1}
            </DropdownToggle>
            <DropdownMenu className={styles['form__categories__menu']}>
              {this.props.categories.map(cat => {
                return (
                  <DropdownItem
                    onClick={this.dropdownSelect}
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

          <ButtonDropdown
            isOpen={this.state.dropdownOpen2}
            toggle={this.dropdownToggle2}
            data-name='dropdownOpen2'
          >
            <DropdownToggle caret outline>
              {this.state.dropdownValue2}
            </DropdownToggle>
            <DropdownMenu className={styles['form__categories__menu']}>
              {this.props.categories.map(cat => {
                return (
                  <DropdownItem
                    onClick={this.dropdownSelect}
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

          <ButtonDropdown
            isOpen={this.state.dropdownOpen3}
            toggle={this.dropdownToggle3}
            data-name='dropdownOpen3'
          >
            <DropdownToggle caret outline>
              {this.state.dropdownValue3}
            </DropdownToggle>
            <DropdownMenu className={styles['form__categories__menu']}>
              {this.props.categories.map(cat => {
                return (
                  <DropdownItem
                    onClick={this.dropdownSelect}
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
