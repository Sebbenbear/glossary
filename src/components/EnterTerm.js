import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import * as firebase from '../firebase/firebase'; 

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  button: {
    position: 'absolute',
    bottom: "5%",
    left: "50%",
  }
});

class EnterTerm extends React.Component {
  state = {
    acronym: '',
    term: '',
    definition: '',
    tags: '',
  };

  handleChange = event => {
    const value = event.target.value;
    switch(event.target.id) {
      case 'acronym': 
        this.setState({ acronym: value.toUpperCase() }); // Acronyms should be upper case
        break;
      case 'term': 
        this.setState({ term: value });
        break;
      case 'definition': 
        this.setState({ definition: value });
        break;
      case 'tags': 
        this.setState({ tags: value }); // keep the string value of the tags, split them when you need to use them
        break;
      default:
        console.error("Handling error event");
    }
  };

  handleDone = () => {
    const tagList = [...this.state.tags.split(',')] // store tags in an array for manipulation later  

    // check for empty tags
    if (!this.state.term) {
      return;
    }

    const term = Object.assign({
        acronym: this.state.acronym,
        term: this.state.term,
        definition: this.state.definition,
        tags: tagList
    }, this.state);
    
    firebase.writeNewTerm(term);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="acronym-simple">Acronym</InputLabel>
            <Input id="acronym" value={this.state.acronym} onChange={this.handleChange} />
            </FormControl>

            <FormControl className={classes.formControl} >
            <InputLabel htmlFor="term-simple">Term</InputLabel>
            <Input id="term" value={this.state.term} onChange={this.handleChange} />
            </FormControl>

            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="definition-simple">Definition</InputLabel>
            <Input id="definition" value={this.state.definition} onChange={this.handleChange} />
            </FormControl>

            <FormControl className={classes.formControl}>
            <InputLabel htmlFor="tags-simple">Tags</InputLabel>
            <Input id="tags" value={this.state.tags} onChange={this.handleChange} />
            <FormHelperText id="tags-helper-text">Separate tags with " , "</FormHelperText>
          </FormControl>
        </div>

        <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" aria-label="Done" className={classes.button} onClick={this.handleDone}>Done</Button>
        </Link>
      </div>
    );
  }
}

EnterTerm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnterTerm);
