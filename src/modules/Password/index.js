//Register component
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import firebase from '../../main/firebase.config';
import 'firebase/auth';
import styles from './Password.module.css';

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.resetPW = this.resetPW.bind(this);

    this.state = { email: '' };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  resetPW() {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        // Email sent.
        alert('Password reset mail has been sent to ' + this.state.email);
        this.setState({ email: '' });
      })
      .catch(error => {
        // An error happened.
        alert(error.message);
        this.setState({ email: '' });
      });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
            onClick={() => this.resetPW()}
          >
            Send email
          </Button>
        </Form>
      </div>
    );
  }
}

export default ResetPassword;
