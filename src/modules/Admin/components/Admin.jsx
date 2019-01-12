import React from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import CategoryList from './categoryList';
import ItemList from './itemList';
import UsersList from './usersList';
import { FirebaseDB } from '../../Firebase';
//import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addCategories } from '../../Listing';
import styles from '../../../main/css/Admin.module.css';

class AdminSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1'
    };

    this.FbDB = new FirebaseDB();
  }

  switchManagement = event => {
    const tab = event.target.id;
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    //admin section can only be entered if admin clicks on Admin section btn in footer
    //manual routing wont work in any case
    // if (!this.props.user) {
    //   return <Redirect to='/' />;
    // }

    return (
      <div className={styles['admin__nav']}>
        <Nav tabs className={styles['admin__nav--position']}>
          <NavItem className={styles['admin__navItem']}>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={this.switchManagement}
              id='1'
            >
              Category management
            </NavLink>
          </NavItem>
          <NavItem className={styles['admin__navItem']}>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={this.switchManagement}
              id='2'
            >
              Item management
            </NavLink>
          </NavItem>
          <NavItem className={styles['admin__navItem']}>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={this.switchManagement}
              id='3'
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
            <CategoryList
              addCategories={this.props.addCategories}
              categories={this.props.categories}
            />
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
    user: state.user[0],
    categories: state.categories
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    ...bindActionCreators({ addCategories }, dispatch)
  };
}

export const AdminConn = connect(
  mapStateToProps,
  mapDispatchtoProps
)(AdminSection);
