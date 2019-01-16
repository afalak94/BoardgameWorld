import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class ProtectedRoute extends React.Component {
  render() {
    const {
      computedMatch,
      exact,
      location,
      path,
      component,
      user
    } = this.props;
    return (
      <Route
        {...computedMatch}
        {...exact}
        {...location}
        {...path}
        render={() => {
          //no one is loged in yet so wait for user authentication
          if (user.uid === 'none') {
            return <Route />;
          }
          //someone has logged in -> check if user is admin
          if (user.uid === '6qXBbupnZsQkpp5vj5ZmteGF1qs1') {
            return <Route component={component} />;
          }
          //check if user is not admin -> redirect to home
          if (
            user.uid === 'guest' ||
            user.uid !== '6qXBbupnZsQkpp5vj5ZmteGF1qs1'
          ) {
            return <Redirect to='/' />;
          }
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user[0] };
}

export const ProtectedConn = connect(
  mapStateToProps,
  null
)(ProtectedRoute);
