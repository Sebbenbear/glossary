import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import EnterTerm from './EnterTerm';
import Home from './Home';

import * as routes from '../constants/routes';

const App = () => (
  <Router>
    <div>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tech Glossary</h1>
        </header>
      </div>

      {/* <Route path="/signup" component={SignUp} /> */}
      {/* <Route exact path={routes.LANDING} component={Home} /> */}

      {/* Use functional stateless components then offload to transfer new props */}
      <Route exact path={routes.LANDING} component={Home} />} />
      <Route path={routes.ENTER_TERM} component={EnterTerm} />

    </div>
  </Router>
);

export default App;