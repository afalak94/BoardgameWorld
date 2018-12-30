import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
  Input
} from 'reactstrap';
import classnames from 'classnames';
import CategoryList from './categoryList';
import ItemList from './itemList';
import UsersList from './usersList';
import firebase from '../../main/firebase.config';
import 'firebase/database';
import 'firebase/auth';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import styles from './Admin.module.css';

class AdminSection extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.addCategory = this.addCategory.bind(this);
    this.state = {
      activeTab: '1',
      inputValue: ''
    };

    console.log(this.props.user);
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
    this.setState({ inputValue: '' });
    //check if name is valid length
    if (name.length < 1 || name.length > 18) {
      alert('Invalid category name length');
    } else {
      // Get a key for a new Post.
      const newPostKey = firebase
        .database()
        .ref()
        .child('categories')
        .push().key;
      //update a new category to firebase
      let updates = {};
      updates['/categories/' + newPostKey] = name;
      return firebase
        .database()
        .ref()
        .update(updates);
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    //admin section can only be entered if admin clicks on Admin section btn in footer
    //manual routing wont work in any case
    if (!this.props.user) {
      return <Redirect to='/' />;
    }

    return (
      <div className={styles['admin__nav']}>
        <Nav tabs className={styles['admin__nav--position']}>
          <NavItem className={styles['admin__navItem']}>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              Category management
            </NavLink>
          </NavItem>
          <NavItem className={styles['admin__navItem']}>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              Item management
            </NavLink>
          </NavItem>
          <NavItem className={styles['admin__navItem']}>
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
          className={styles['admin__tabContent']}
        >
          <TabPane tabId='1'>
            <Row style={{ width: 1500 }}>
              <Col sm={{ size: 'auto' }}>
                <CategoryList />
              </Col>

              <Col sm={{ size: 'auto' }}>
                <div className={styles['category__input__wrapper']}>
                  <h3>Add a new category</h3>
                  <p>(max. 18 letters)</p>
                  <Input
                    value={this.state.inputValue}
                    onChange={e => this.updateInputValue(e)}
                  />
                  <Button
                    color='success'
                    onClick={() => this.addCategory(this.state.inputValue)}
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId='2'>
            <Row style={{ width: 1500 }}>
              <Col sm={{ size: 'auto' }}>
                <ItemList />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId='3'>
            <UsersList />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user[0]
  };
}

export default connect(
  mapStateToProps,
  null
)(AdminSection);
