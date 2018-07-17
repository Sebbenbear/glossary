import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Tech Glossary</h1>
        </header>

        <Button variant="fab" color="primary" aria-label="Add">
          <AddIcon />
        </Button>

        <p className="App-intro">
          There's nothing here, add a term!
        </p>
      </div>
    );
  }
}

export default App;
