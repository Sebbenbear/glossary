import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from './Navigation';

import LandingPage from './Landing';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';

import EnterTerm from './EnterTerm';
//import Home from './Home';

import * as routes from '../constants/routes';

const App = () => (
  
  <Router>
    <div>
      <Navigation />
      <hr/>
      <Route 
        exact path={routes.LANDING}
        component={() => <LandingPage/>} 
      />
      <Route 
        exact path={routes.SIGN_UP}
        component={() => <SignUpPage/>} 
      />
      <Route 
        exact path={routes.SIGN_IN}
        component={() => <SignInPage/>} 
      />
      <Route 
        exact path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage/>} 
      />
      <Route 
        exact path={routes.HOME}
        component={() => <HomePage/>}
      />
      <Route 
        exact path={routes.ACCOUNT}
        component={() => <AccountPage/>}
      />
      
    </div>
    {/* <div>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tech Glossary</h1>
        </header>
      </div> */}

      {/* <Route path="/signup" component={SignUp} /> */}
      {/* <Route exact path={routes.LANDING} component={Home} /> */}

      {/* Use functional stateless components then offload to transfer new props */}
      {/* <Route exact path={routes.LANDING} component={Home} />
      <Route path={routes.ENTER_TERM} component={EnterTerm} />

    </div> */}
  </Router>
);

export default App;