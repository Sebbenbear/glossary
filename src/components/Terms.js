import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";
import * as routes from '../constants/routes';

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

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  state = {
    expanded: null,
  };

  handleDelete() {
    if (this.state.expanded) {
      this.props.handleDelete(this.state.expanded);
      this.setState({
        expanded: null
      });
    }
  }

  generateListItems = data => {
    const { classes } = this.props;

    return this.props.data.map(datum => (
        <ExpansionPanel 
          key={datum.termId} 
          expanded={this.state.expanded === datum} 
          onChange={this.handleChange(datum)}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{datum.term}</Typography>
            {datum.acronym && <Typography className={classes.secondaryHeading}>{datum.acronym}</Typography>}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                  {datum.definition}
                </Typography>
                <div>
                  <Link to={{pathname: routes.ENTER_TERM, state: this.state.expanded}}>
                    <Button variant="flat" color="primary" type="submit">
                      <i className="material-icons">edit</i>
                    </Button>
                  </Link>
                  <Button variant="flat" color="primary" onClick={this.handleDelete} type="submit">
                    <i className="material-icons">delete</i>
                  </Button>
                </div>
                
            </ExpansionPanelDetails>
            
            {/* {datum.tags && datum.tags.map((tag) => 
                <Chip label={tag} className={classes.chip} key={tag}/>
            )} */}

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
  data: PropTypes.array.isRequired,
};

export default withStyles(styles)(Terms);