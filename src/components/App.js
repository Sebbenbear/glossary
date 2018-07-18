import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import EnterTerm from './EnterTerm';
import Home from './Home';

import * as routes from '../constants/routes';
import * as firebase from '../firebase/firebase'; 

firebase.signInAnonymously();
let data = firebase.getTerms();

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
      <Route exact path={routes.LANDING} render={(props) => <Home {...props} data={data} />} />
      <Route path={routes.ENTER_TERM} component={EnterTerm} />

    </div>
  </Router>
);

// const Topics = ({ match }) => (
//   <div>
//     <h2>Topics</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/rendering`}>Rendering with React</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/components`}>Components</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
//       </li>
//     </ul>

//     <Route path={`${match.url}/:topicId`} component={Topic} />
//     <Route
//       exact
//       path={match.url}
//       render={() => <h3>Please select a topic.</h3>}
//     />
//   </div>
// );

// const Topic = ({ match }) => (
//   <div>
//     <h3>{match.params.topicId}</h3>
//   </div>
// );

export default App;