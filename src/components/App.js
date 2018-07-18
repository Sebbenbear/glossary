import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import EnterTerm from './EnterTerm';
import Terms from './Terms';

import * as routes from '../constants/routes';

import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(config);

function writeUserData(userId) {
  firebase.database().ref('users/' + userId).set({
    number: 1
  });
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('auth changed!');
    console.log(user);
    var userId = firebase.auth().currentUser.uid;
    writeUserData(userId)
  } else {
    // No user is signed in.
    console.log('no user')
  }
});

firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorCode);
  console.log(errorMessage);
});

// let res = firebase.auth()
//   .signInWithEmailAndPassword('email@gmail.com', '')
//   .then(() => {
//     var userId = firebase.auth().currentUser.uid;
//     console.log(userId);
//     writeUserData(userId);
//   })
//   .catch(function(error) {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorCode);
//     console.log(errorMessage);
//   }
// );
// console.log(res);

const App = () => (
  <Router>
    <div>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tech Glossary</h1>
        </header>
      </div>

      {/* <Route path="/signup" component={SignUp} /> */}
      <Route exact path={routes.LANDING} component={Home} />
      <Route path={routes.ENTER_TERM} component={EnterTerm} />
      {/* <Route path="/topics" component={Topics} /> */}
    </div>
  </Router>
);

const data = [
  {
    acronym: 'AOT',
    term: 'Ahead of Time Compilation',
    definition: 'Compiles high level code to native machine conde like other compilers but also compiles the bytecode of the running virtual machine on the fly.',
    tags: ['compilers', "virtual_machines"],
  }, {
    acronym: '',
    term: 'Android',
    definition: 'Mobile operating system, based on the Linux kernel.',
    tags: ['android', 'mobile', 'operating_systems'],
  }
];


const Home = () => (
  <div className="App">

    { !data && <p className="App-intro">
        There's nothing here, add a term!
      </p> 
    }
    
    { data && <Terms data={data}/> }
    <Link to={routes.ENTER_TERM}>
      <Button variant="fab" color="primary" aria-label="Add" style={{ position: 'absolute', bottom: "20px", right: "20px" }}> {/* #C1D09B - should be this colour*/} 
        <AddIcon />
      </Button>
    </Link>
  </div>
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