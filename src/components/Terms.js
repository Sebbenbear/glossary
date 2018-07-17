import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
});

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

const listItems = data.map((datum) => (
  <div>
    <ListItem button>
      <ListItemText primary={datum.term} />
    </ListItem>
    <Divider />
  </div>
));

function Terms(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        {listItems}
      </List>
    </div>
  );
}

Terms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Terms);