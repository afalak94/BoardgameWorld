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
import CategoryList from '../components/CategoryList';
import ItemList from '../components/ItemList';
import UsersList from '../components/UsersList';
import { FirebaseDB } from '../../Firebase';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
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

  render() {
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
              categories={this.props.categories}
              dispatch={this.props.dispatch}
            />
          </TabPane>

          <TabPane tabId='2'>
            <Row style={{ width: 1500 }}>
              <Col sm={{ size: 'auto' }}>
                <ItemList
                  boardgames={this.props.boardgames}
                  categories={this.props.categories}
                  dispatch={this.props.dispatch}
                />
              </Col>
            </Row>
          </TabPane>

          <TabPane tabId='3'>
            <UsersList
              // fetchUsers={this.props.fetchUsers}
              allUsers={this.props.allUsers}
              dispatch={this.props.dispatch}
              // deleteUser={this.props.deleteUser}
            />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user[0],
    categories: state.categories,
    boardgames: state.boardgames[state.boardgames.length - 1],
    allUsers: state.allUsers
  };
}

export const AdminConn = connect(
  mapStateToProps,
  dispatch => {
    return { dispatch };
  }
)(AdminSection);
