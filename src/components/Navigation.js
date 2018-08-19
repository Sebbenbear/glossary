import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import Button from '@material-ui/core/Button';

const Navigation = ({ authUser }) =>
  <div>
    { authUser ? <NavigationAuth /> : <NavigationNonAuth /> }
  </div>

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
