//Register component
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FirebaseAuth } from '../../Firebase';
import styles from '../../../main/css/Register.module.css';

export class Register extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
    //firebase authentication object
    this.FbAuth = new FirebaseAuth();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
    this.FbAuth.register(
      this.state.email,
      this.state.password,
      this.props.history
    );
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
