import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SignUpPage = ({ history }) => ( // destructure history part of prop
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history}/>
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  password1: '',
  password2: '',
  error: null
}

// look into this
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE }; 
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const { history } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    // Stop browser reloading the page
    event.preventDefault();
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      username === '' ||
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <TextField 
          id="username" 
          label="User name" 
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
        />
        <TextField 
          id="email" 
          label="Email" 
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="email"
        />
        <TextField 
          id="passwordOne" 
          label="Password" 
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
        />
        <TextField 
          id="passwordTwo" 
          label="Confirm password" 
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
        />
        <Button variant="contained" color="primary" disabled={isInvalid} type="submit">
          Sign Up
        </Button>
        { error && <p>{error.message}</p> } 
        </form>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    <Link to={routes.SIGN_UP}>Sign up here</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpLink,
  SignUpForm
}
