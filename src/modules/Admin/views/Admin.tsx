import React, { ReactNode } from 'react';
import { TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link, Route, BrowserRouter } from 'react-router-dom';

import { ReduxState } from '../../../main';
import { Boardgame, CategoryInterface } from '../../Boardgames';
import { User } from '../../Authentication';
import CategoryList from '../components/CategoryList';
import ItemList from '../components/ItemList';
import UsersList from '../components/UsersList';
import { FirebaseDB, FirebaseDBTypes } from '../../Firebase';
const styles = require('../../../main/css/Admin.module.css');

interface ReduxStateProps {
  categories: CategoryInterface[];
  boardgames: Boardgame | Boardgame[];
  allUsers: User[];
}

interface Props extends ReduxStateProps {
  match: { isExact: boolean; path: string; url: string; params: object };
  dispatch: Dispatch;
}

class AdminSection extends React.Component<Props> {
  public FbDB: FirebaseDBTypes;

  constructor(props: Props) {
    super(props);

    this.FbDB = new FirebaseDB(null);
  }

  renderCategoryManagement = (props: {}): ReactNode => {
    return (
      <CategoryList
        {...props}
        categories={this.props.categories}
        dispatch={this.props.dispatch}
      />
    );
  };

  renderItemManagement = (props: {}): ReactNode => {
    return (
      <ItemList
        {...props}
        boardgames={this.props.boardgames}
        categories={this.props.categories}
        dispatch={this.props.dispatch}
      />
    );
  };

  renderUsersManagement = (props: {}): ReactNode => {
    return (
      <UsersList
        {...props}
        allUsers={this.props.allUsers}
        dispatch={this.props.dispatch}
      />
    );
  };

  render() {
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
              render={this.renderCategoryManagement}
            />

            <Route
              exact
              path={`${match.path}/items`}
              render={this.renderItemManagement}
            />

            <Route
              exact
              path={`${match.path}/users`}
              render={this.renderUsersManagement}
            />

            <Route
              exact
              path={match.path}
              render={this.renderCategoryManagement}
            />
          </TabContent>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState): ReduxStateProps => {
  return {
    categories: state.categories,
    boardgames: state.boardgames[state.boardgames.length - 1],
    allUsers: state.allUsers
  };
};

export const AdminConn = connect(
  mapStateToProps,
  null
)(AdminSection);
