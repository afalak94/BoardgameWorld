// Register component
import React, { Component, ChangeEvent } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { FirebaseAuth, FirebaseAuthTypes } from '../../Firebase';
const styles = require('../../../main/css/Register.module.css');

interface Props {
  history: any;
}

interface State {
  email: string;
  password: string;
}

export class Register extends Component<Props, State> {
  public state = { email: '', password: '' };
  public FbAuth: FirebaseAuthTypes = new FirebaseAuth(null);

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<
      State,
      keyof State
    >);
  };

  handleClick = () => {
    const { email, password } = this.state;
    const { history } = this.props;
    this.FbAuth.register(email, password, history);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className={styles.register__form}>
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
            className={styles.register__btn}
            onClick={this.handleClick}
          >
            Register
          </Button>
        </Form>
      </div>
    );
  }
}
