//Register component
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FirebaseAuth } from '../../Firebase';
import styles from '../../../main/css/Password.module.css';

export class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '' };
    //firebase authentication object
    this.FbAuth = new FirebaseAuth();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
              name='email'
              id='exampleEmail'
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
