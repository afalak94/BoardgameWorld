//Login component
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import firebase from '../../main/firebase.config';
import 'firebase/auth';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);

    this.state = { email: '', password: '' };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        //redirect loged in user to homepage
        this.props.history.push('/');
      })
      .catch(function(error) {
        // Handle Errors here.
        console.log(error.message);
      });
  }

  render() {
    return (
      <div className='container login__form'>
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

          <Button onClick={this.login}>Log in</Button>
        </Form>
      </div>
    );
  }
}

export default Login;
