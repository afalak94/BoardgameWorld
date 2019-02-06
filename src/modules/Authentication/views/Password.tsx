// Register component
import React, { Component, ChangeEvent } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { FirebaseAuth, FirebaseAuthTypes } from '../../Firebase';
const styles = require('../../../main/css/Password.module.css');

interface State {
  email: string;
}

export class ResetPassword extends Component<{}, State> {
  public state = { email: '' };
  // firebase authentication object
  public FbAuth: FirebaseAuthTypes = new FirebaseAuth({});

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  handleClick = () => {
    this.FbAuth.resetPW(this.state.email);
    this.setState({ email: '' });
  };

  render() {
    return (
      <div className={styles.password__form}>
        <Form>
          <h4>
            Insert your registered email account and we will send you password
            reset message
          </h4>
          <br />
          <FormGroup>
            <Label for='exampleEmail'>Email</Label>
            <Input
              value={this.state.email}
              onChange={this.handleChange}
              type='email'
              placeholder='Enter your email account'
            />
          </FormGroup>

          <Button
            color='success'
            className={styles.password__btn}
            onClick={this.handleClick}
          >
            Send email
          </Button>
        </Form>
      </div>
    );
  }
}
