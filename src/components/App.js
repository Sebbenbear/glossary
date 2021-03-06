import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from './Navigation';
//import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import EnterTermPage from './EnterTerm';

import withAuthentication from './Session/withAuthentication';
import * as routes from '../constants/routes';

import './App.css';

const App = () =>
  <Router>
    <div>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tech Glossary</h1>
        </header>
      </div>
      <Navigation />
      {/* <Route exact path={routes.LANDING} component={() => <LandingPage />} /> */}
      <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />
      <Route exact path={routes.SIGN_IN} component={() => <SignInPage />} />
      <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
      <Route exact path={routes.HOME} component={() => <HomePage />} />
      <Route exact path={routes.ACCOUNT} component={() => <AccountPage />} />
      <Route exact path={routes.ENTER_TERM} component={() => <EnterTermPage />} />
    </div>
  </Router>

// Wrap app in session handling higher order component
export default withAuthentication(App);
