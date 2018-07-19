import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import Terms from './Terms';

import { Link } from "react-router-dom";
import * as routes from '../constants/routes';

import CircularProgress from '@material-ui/core/CircularProgress';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  fab: {
    position: 'absolute', 
    bottom: '20px', 
    right: '20px'
  },
  block: {
    marginTop: '100px'
  },
  progress: {
    display: 'block',
    margin: 'auto'
  }
});

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: []
    };
  };

  componentDidMount() {
    this.setState({
        isLoading: true
    })
  }

  render() {
    const { classes, data } = this.props;
    const isLoading = this.state.isLoading;

    if (isLoading) {
      return (
          <div> 
          <div className={classes.block}></div>
          <CircularProgress className={classes.progress} style={{ color: grey[800] }} thickness={7} />
          </div>
        );
    }

    return (
    <div className="App">
        { data.length === 0 && 
        <p className="App-intro">
            There's nothing here, add a term!
        </p>
        }

        { data.length > 0 && <Terms data={data}/> }
        <Link to={routes.ENTER_TERM}>
          {/* <Button variant="fab" color="primary" aria-label="Add" style={{ position: 'absolute', bottom: "20px", right: "20px" }}> #C1D09B - should be this colour  */}
          <Button variant="fab" color="primary" aria-label="Add" className={classes.fab}> {/* #C1D09B - should be this colour*/} 
           <AddIcon />
          </Button>
        </Link>
    </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);