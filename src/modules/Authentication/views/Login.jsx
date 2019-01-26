//Login component
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FirebaseAuth } from '../../Firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from '../../../main/css/Login.module.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { email: '', password: '' };
    //firebase authentication object
    this.FbAuth = new FirebaseAuth();
  }

  componentDidMount() {
    this.unsubscribe = this.FbAuth.userListener(
      this.props.dispatch,
      this.props.history
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = () => {
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
  state => {
    return {
      user: state.user[0]
    };
  },
  dispatch => {
    return { dispatch };
  }
)(Login);
