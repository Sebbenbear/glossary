import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});

class EnterTerm extends React.Component {
  state = {
    acronym: 'AOT',
    term: 'Ahead of Time Compilation',
    definition: 'Compiles high level code to native machine conde like other compilers but also compiles the bytecode of the running virtual machine on the fly.',
    tags: 'compilers',
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
        // throw exception
        console.error("Handling error event");
    }
  };

  handleDone = event => {
    const data = Object.assign({
        acronym: this.state.acronym, 
        term: this.state.term,
        definition: this.state.definition,
        tags: this.state.tags.split(/(\s+)/)
    }, this.state);
    console.table(data);
  }

  render() {
    const { classes } = this.props;

    return (
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
          <FormHelperText id="tags-helper-text">Separate tags with spaces</FormHelperText>
        </FormControl>

        <Button onClick={this.handleDone}>Done</Button>
      </div>
    );
  }
}

EnterTerm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnterTerm);
