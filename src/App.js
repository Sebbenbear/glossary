import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import EnterTerm from './components/EnterTerm';

const App = () => (
  <Router>
    <div>
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tech Glossary</h1>
        </header>
      </div>

      <Route exact path="/" component={Home} />
      <Route path="/enterterm" component={EnterTerm} />
      {/* <Route path="/topics" component={Topics} /> */}
    </div>
  </Router>
);

const Home = () => (
  <div className="App">
    <Link to="/enterterm">
    {/* #C1D09B - should be this colour*/} 
      <Button variant="fab" color="primary" aria-label="Add">
        <AddIcon />
      </Button>
    </Link>

    <p className="App-intro">
      There's nothing here, add a term!
    </p>
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