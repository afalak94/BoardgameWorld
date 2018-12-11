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

export default class ItemInfoTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);

    this.state = {
      dropdownOpen1: false,
      dropdownOpen2: false,
      dropdownOpen3: false,
      dropdownValue1: 'Category 1',
      dropdownValue2: 'Category 2',
      dropdownValue3: 'Category 3'
    };

    console.log(this.props.item);
    console.log(this.props.categories);
  }

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
            <Input name='item_name' />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Score</Label>
          <Col sm={8}>
            <Input name='score' />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Image URL</Label>
          <Col sm={8}>
            <Input name='imgUrl' />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Price</Label>
          <Col sm={4}>
            <Input name='price' style={{ float: 'left' }} />
            <InputGroupAddon addonType='append'>
              <InputGroupText className='inputGroup__dolar'>$</InputGroupText>
            </InputGroupAddon>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label sm={2}>Sale price</Label>
          <Col sm={4}>
            <Input name='salePrice' style={{ float: 'left' }} />
            <InputGroupAddon addonType='append'>
              <InputGroupText className='inputGroup__dolar'>$</InputGroupText>
            </InputGroupAddon>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col sm={{ size: 12 }}>
            <FormGroup check>
              <Label check>
                <Input
                  type='checkbox'
                  //defaultChecked={false}
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
            <Input type='textarea' name='text' />
          </Col>
        </FormGroup>

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
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}
