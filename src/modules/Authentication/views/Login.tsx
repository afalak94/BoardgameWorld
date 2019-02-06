// Login component
import React, { Component, ChangeEvent } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import { ReduxState } from '../../../main';
import { FirebaseAuth, FirebaseAuthTypes } from '../../Firebase';
const styles = require('../../../main/css/Login.module.css');

interface Props {
  dispatch: Dispatch;
  history: any;
}

interface State {
  email: string;
  password: string;
}
class Login extends Component<Props, State> {
  public FbAuth: FirebaseAuthTypes = new FirebaseAuth({});
  state = { email: '', password: '' };
  public unsubscribe: any;

  componentDidMount() {
    const { dispatch, history } = this.props;
    this.unsubscribe = this.FbAuth.userListener(dispatch, history);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({ [e.target.name]: e.target.value } as Pick<
      State,
      keyof State
    >);
  };

  handleClick = (): void => {
    const { email, password } = this.state;
    this.FbAuth.loginUser(email, password);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className={styles['login__form']}>
        <Form>
          <FormGroup>
            <Label for='exampleEmail'>Email</Label>
            <Input
              value={email}
              onChange={this.handleChange}
              type='email'
              name='email'
              id='exampleEmail'
              placeholder='Enter your email account'
            />
          </FormGroup>

          <FormGroup>
            <Label for='examplePassword'>Password</Label>
            <Input
              value={password}
              onChange={this.handleChange}
              type='password'
              name='password'
              id='examplePassword'
              placeholder='Enter your password'
            />
          </FormGroup>

          <Button
            color='success'
            className={styles['login__btn']}
            onClick={this.handleClick}
          >
            Log in
          </Button>
          <Button
            color='danger'
            className={styles.login__btn}
            tag={Link}
            to='/password'
          >
            Forgot password?
          </Button>
        </Form>
      </div>
    );
  }
}

export const LoginConn = connect(
  (state: ReduxState) => {
    return {
      user: state.user[0]
    };
  },
  (dispatch: Dispatch) => {
    return { dispatch };
  }
)(Login);
