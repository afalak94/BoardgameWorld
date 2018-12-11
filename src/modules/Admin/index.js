import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from 'reactstrap';
import classnames from 'classnames';
import CategoryList from './categoryList';
import ItemList from './itemList';
import firebase from '../../main/firebase.config';
import 'firebase/database';

export default class AdminSection extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.state = {
      activeTab: '1',
      inputValue: ''
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  updateInputValue(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  addCategory(name) {
    //adding a new category to firebase
    //console.log(name);
    this.setState({ inputValue: '' });

    // Get a key for a new Post.
    const newPostKey = firebase
      .database()
      .ref()
      .child('categories')
      .push().key;
    let updates = {};
    updates['/categories/' + newPostKey] = name;
    return firebase
      .database()
      .ref()
      .update(updates);
  }

  render() {
    return (
      <div className='admin__nav'>
        <Nav tabs className='admin__nav--position'>
          <NavItem className='admin__navItem'>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              Category management
            </NavLink>
          </NavItem>
          <NavItem className='admin__navItem'>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              Item management
            </NavLink>
          </NavItem>
          <NavItem className='admin__navItem'>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => {
                this.toggle('3');
              }}
            >
              Users management
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent
          activeTab={this.state.activeTab}
          className='admin__tabContent'
        >
          <TabPane tabId='1'>
            <Row style={{ width: 1500 }}>
              <Col sm={{ size: 'auto', offset: 1 }}>
                <CategoryList />
              </Col>

              <Col sm={{ size: 'auto' }}>
                <InputGroup className='category__input'>
                  <InputGroupAddon addonType='prepend'>
                    <InputGroupText className='category__inputText'>
                      Add category
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    value={this.state.inputValue}
                    onChange={e => this.updateInputValue(e)}
                  />
                  <InputGroupAddon
                    className='category__submitBtn'
                    addonType='append'
                    onClick={() => this.addCategory(this.state.inputValue)}
                  >
                    <InputGroupText className='category__inputText'>
                      Submit
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId='2'>
            <Row style={{ width: 1500 }}>
              <Col sm={{ size: 'auto', offset: 1 }}>
                <ItemList />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
