import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './Session/AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

import Button from '@material-ui/core/Button';

const style = {
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center'
}
// Wrap the Navigation component in a Consumer context, so it has access to authUser
const Navigation = () =>
  <AuthUserContext.Consumer>
    { authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <div style={style}>
    {/* <Button variant="flat" color="primary" component={Link} to={routes.LANDING}>
      Landing
    </Button> */}
    <Button variant="flat" color="primary" component={Link} to={routes.HOME}>
      Home
    </Button>
    <Button variant="flat" color="primary" component={Link} to={routes.ACCOUNT}>
      Account
    </Button>
    <SignOutButton />
  </div>

const NavigationNonAuth = () =>
  <div style={style}>
    <Button variant="flat" color="primary" component={Link} to={routes.SIGN_IN}>
      Sign In
    </Button>
    <Button variant="flat" color="primary" component={Link} to={routes.SIGN_UP}>
      Sign Up
    </Button>
  </div>

export default Navigation;
