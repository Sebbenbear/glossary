import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

class Terms extends React.Component {
  state = {
    expanded: null,
    data: [
        {
          acronym: 'AOT',
          term: 'Ahead of Time Compilation',
          definition: 'Compiles high level code to native machine code like other compilers but also compiles the bytecode of the running virtual machine on the fly.',
          tags: ['compilers', "virtual machines"],
        }, {
          acronym: '',
          term: 'Android',
          definition: 'Mobile operating system, based on the Linux kernel.',
          tags: ['android', 'mobile', 'operating systems'],
        }
      ]
  };

  generateListItems = data => {
    const { classes } = this.props;

    return this.state.data.map(datum => (
        <ExpansionPanel key={datum.term} expanded={this.state.expanded === datum.term} onChange={this.handleChange(datum.term)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{datum.term}</Typography>
            {datum.acronym && <Typography className={classes.secondaryHeading}>{datum.acronym}</Typography>}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>{datum.definition}</Typography>
            </ExpansionPanelDetails>
            
            {datum.tags && datum.tags.map((tag) => 
                <Chip label={tag} className={classes.chip} key={tag}/>
            )}

        </ExpansionPanel>
    ))
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        {this.generateListItems()}
      </div>
    );
  }
}

Terms.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Terms);