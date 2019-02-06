import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { User } from '../../Authentication';
import { ReduxState } from '../../../main';

interface Props {
  computedMatch?: {};
  exact?: {};
  location?: {};
  path: string;
  component: any;
  user: User;
}

class ProtectedRoute extends Component<Props> {
  renderRoutes = () => {
    const { component, user } = this.props;
    // no one is loged in yet so wait for user authentication
    if (user.uid === 'none') {
      return <Route />;
    }
    // someone has logged in -> check if user is admin
    if (user.uid === '6qXBbupnZsQkpp5vj5ZmteGF1qs1') {
      return <Route component={component} />;
    }
    // check if user is not admin -> redirect to home
    if (user.uid === 'guest' || user.uid !== '6qXBbupnZsQkpp5vj5ZmteGF1qs1') {
      return <Redirect to='/' />;
    }
    return null;
  };

  render() {
    const { computedMatch, exact, location, path } = this.props;
    return (
      <Route
        {...computedMatch}
        {...exact}
        {...location}
        {...path}
        render={this.renderRoutes}
      />
    );
  }
}

export const ProtectedConn = connect(
  (state: ReduxState) => {
    return {
      user: state.user[0]
    };
  },
  null
)(ProtectedRoute);
