//Login component
import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import firebase from '../../main/firebase.config';
import 'firebase/auth';
import { connect } from 'react-redux';
import { addUser } from '../../modules/Login/actions';
import { bindActionCreators } from 'redux';

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.authListener = this.authListener.bind(this);

    this.state = { email: '', password: '' };
  }

  componentDidMount() {
    //listener for firebase authentication
    this.authListener();
  }

  //listener for user authentication
  authListener() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.addUser(user);
        if (this.props.user.uid === '6qXBbupnZsQkpp5vj5ZmteGF1qs1') {
          this.props.history.push('/admin');
        } else {
          this.props.history.push('/');
        }
      } else {
        //this.setState({ user: null });
      }
      //console.log(this.props.user);
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
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

function mapStateToProps(state) {
  return {
    user: state.user[0]
  };
}

function mapDispatchtoProps(dispatch) {
  return {
    ...bindActionCreators({ addUser }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(Login);
