import React from 'react';
import { Link } from 'react-router-dom';

import AuthUserContext from './Session/AuthUserContext';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

import Button from '@material-ui/core/Button';

// Wrap the Navigation component in a Consumer context, so it has access to authUser
const Navigation = () =>
  <AuthUserContext.Consumer>
    { authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
  </AuthUserContext.Consumer>

const NavigationAuth = () =>
  <ul>
    <li><Link to={routes.LANDING}>Landing</Link></li>
    <li><Link to={routes.HOME}>Home</Link></li>
    <li><Link to={routes.ACCOUNT}>Account</Link></li>
    <li><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Button variant="flat" color="primary" component={Link} to={routes.SIGN_IN}>
      Sign In
    </Button>
    <Button variant="flat" color="primary" component={Link} to={routes.SIGN_UP}>
      Sign Up
    </Button>
  </div>

export default Navigation;
