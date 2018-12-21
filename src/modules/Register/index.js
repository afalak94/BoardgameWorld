//Register component
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import firebase from '../../main/firebase.config';
import 'firebase/auth';
import styles from './Register.module.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);

    this.state = { email: '', password: '' };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  register(e) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        //redirect loged in user to homepage
        this.props.history.push('/');
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log(error.message);
      });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className={styles.register__form}>
        <Form>
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

          <FormGroup>
            <Label for='examplePassword'>Password</Label>
            <Input
              value={this.state.password}
              onChange={this.handleChange}
              type='password'
              name='password'
              id='examplePassword'
              placeholder='Enter your password'
            />
          </FormGroup>

          <Button onClick={this.register}>Register</Button>
        </Form>
      </div>
    );
  }
}

export default Register;
