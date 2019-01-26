import React from 'react';
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import CategoryList from '../components/CategoryList';
import ItemList from '../components/ItemList';
import UsersList from '../components/UsersList';
import { FirebaseDB } from '../../Firebase';
import { connect } from 'react-redux';
import { Link, Route, BrowserRouter } from 'react-router-dom';
import styles from '../../../main/css/Admin.module.css';

class AdminSection extends React.Component {
  render() {
    this.FbDB = new FirebaseDB();
    const { match } = this.props;
    return (
      <div className={styles['admin__nav']}>
        <Nav tabs className={styles['admin__nav--position']}>
          <NavItem className={styles['admin__navItem']}>
            <NavLink to={`${match.url}/categories`} id='1' tag={Link}>
              Category management
            </NavLink>
          </NavItem>
          <NavItem className={styles['admin__navItem']}>
            <NavLink to={`${match.url}/items`} id='2' tag={Link}>
              Item management
            </NavLink>
          </NavItem>
          <NavItem className={styles['admin__navItem']}>
            <NavLink to={`${match.url}/users`} id='3' tag={Link}>
              Users management
            </NavLink>
          </NavItem>
        </Nav>

        <BrowserRouter>
          <TabContent className={styles['admin__tabContent']}>
            <Route
              exact
              path={`${match.path}/categories`}
              render={props => (
                <CategoryList
                  {...props}
                  categories={this.props.categories}
                  dispatch={this.props.dispatch}
                />
              )}
            />

            <Route
              exact
              path={`${match.path}/items`}
              render={props => (
                <ItemList
                  {...props}
                  boardgames={this.props.boardgames}
                  categories={this.props.categories}
                  dispatch={this.props.dispatch}
                />
              )}
            />

            <Route
              exact
              path={`${match.path}/users`}
              render={props => (
                <UsersList
                  {...props}
                  allUsers={this.props.allUsers}
                  dispatch={this.props.dispatch}
                />
              )}
            />

            <Route
              exact
              path={match.path}
              render={props => (
                <CategoryList
                  {...props}
                  categories={this.props.categories}
                  dispatch={this.props.dispatch}
                />
              )}
            />
          </TabContent>
        </BrowserRouter>
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
