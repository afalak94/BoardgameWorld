import React from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroupText,
  InputGroupAddon,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import styles from './Admin.module.css';

export default class AddItemTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.commonChange = this.commonChange.bind(this);
    this.onSaleChange = this.onSaleChange.bind(this);

    this.state = {
      dropdownOpen1: false,
      dropdownOpen2: false,
      dropdownOpen3: false,
      dropdownValue1: null,
      dropdownValue2: null,
      dropdownValue3: null,
      nameValue: '',
      scoreValue: '',
      imgUrlValue: '',
      priceValue: '',
      salePriceValue: '',
      onSale: false,
      descriptionValue: ''
    };

    // console.log(this.props.item);
    // console.log(this.props.categories);
  }

  commonChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    //console.log(this.state.nameValue);
  }

  onSaleChange(event) {
    this.setState({
      [event.target.name]: event.target.checked
    });
  }

  //toggle function for each category dropdown menu
  toggle1() {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1
    });
  }
  toggle2() {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2
    });
  }
  toggle3() {
    this.setState({
      dropdownOpen3: !this.state.dropdownOpen3
    });
  }

  //functions that change menu toggler text when the category is selected
  select1(event) {
    this.setState({
      dropdownOpen1: !this.state.dropdownOpen1,
      dropdownValue1: event.target.innerText
    });
  }
  select2(event) {
    this.setState({
      dropdownOpen2: !this.state.dropdownOpen2,
      dropdownValue2: event.target.innerText
    });
  }
  select3(event) {
    this.setState({
      dropdownOpen3: !this.state.dropdownOpen3,
      dropdownValue3: event.target.innerText
    });
  }

  render() {
    return (
      <Form>
        <FormGroup row>
          <Label sm={2}>Name</Label>
          <Col sm={8}>
            <Input name='nameValue' type='text' onChange={this.commonChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Score</Label>
          <Col sm={8}>
            <Input name='scoreValue' type='text' onChange={this.commonChange} />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Image URL</Label>
          <Col sm={8}>
            <Input
              name='imgUrlValue'
              type='text'
              onChange={this.commonChange}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Price</Label>
          <Col sm={4}>
            <Input
              name='priceValue'
              onChange={this.commonChange}
              style={{ float: 'left' }}
            />
            <InputGroupAddon addonType='append'>
              <InputGroupText className={styles['inputGroup__dolar']}>
                $
              </InputGroupText>
            </InputGroupAddon>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Sale price</Label>
          <Col sm={4}>
            <Input
              name='salePriceValue'
              onChange={this.commonChange}
              style={{ float: 'left' }}
            />
            <InputGroupAddon addonType='append'>
              <InputGroupText className={styles['inputGroup__dolar']}>
                $
              </InputGroupText>
            </InputGroupAddon>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={{ size: 12 }}>
            <FormGroup check>
              <Label check>
                <Input
                  type='checkbox'
                  name='onSale'
                  onChange={this.onSaleChange}
                />{' '}
                Item on sale?
              </Label>
            </FormGroup>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for='exampleText' sm={2}>
            Description
          </Label>
          <Col sm={12}>
            <Input
              type='textarea'
              name='descriptionValue'
              onChange={this.commonChange}
            />
          </Col>
        </FormGroup>

        {/* 3 categories togglers */}
        <FormGroup row>
          <Label sm={2}>Categories</Label>
          <Col sm={{ size: 3 }}>
            <ButtonDropdown
              isOpen={this.state.dropdownOpen1}
              toggle={this.toggle1}
            >
              <DropdownToggle caret color='info' outline>
                {this.state.dropdownValue1}
              </DropdownToggle>
              <DropdownMenu>
                {this.props.categories.map(cat => {
                  return (
                    <DropdownItem onClick={e => this.select1(e)} key={cat.key}>
                      {cat.value}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </ButtonDropdown>
          </Col>

          <Col sm={3}>
            <ButtonDropdown
              isOpen={this.state.dropdownOpen2}
              toggle={this.toggle2}
            >
              <DropdownToggle caret color='info' outline>
                {this.state.dropdownValue2}
              </DropdownToggle>
              <DropdownMenu>
                {this.props.categories.map(cat => {
                  return (
                    <DropdownItem onClick={e => this.select2(e)} key={cat.key}>
                      {cat.value}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
          <Col sm={3}>
            <ButtonDropdown
              isOpen={this.state.dropdownOpen3}
              toggle={this.toggle3}
            >
              <DropdownToggle caret color='info' outline>
                {this.state.dropdownValue3}
              </DropdownToggle>
              <DropdownMenu>
                {this.props.categories.map(cat => {
                  return (
                    <DropdownItem onClick={e => this.select3(e)} key={cat.key}>
                      {cat.value}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </ButtonDropdown>
          </Col>
        </FormGroup>

        <FormGroup check row>
          <Col sm={{ size: 12 }}>
            <Button
              //passing all values to addNewItem function from props
              onClick={() =>
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
                )
              }
            >
              Add new boardgame
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
