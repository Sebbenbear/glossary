import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import grey from '@material-ui/core/colors/grey';

import Terms from './Terms';

import { Link } from "react-router-dom";
import * as routes from '../constants/routes';

import withAuthorization from './Session/withAuthorization';

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
      isLoading: true
    };
  };

  componentWillMount() {
    this.setState({
      isLoading: false
    });
  }
  // componentWillMount() {
  //   auth.signInAnonymously();
  //   auth.onAuthStateChanged((user) => {
  //     let termsRef = database.ref('/user-terms/' + auth.currentUser.uid);
  //     let userTerms = [];
  //     termsRef.on('value', (snapshot) => {
  //       snapshot.forEach((childSnapShot) => {
  //         userTerms.push(childSnapShot.val());
  //       });
  //       this.setState({
  //         isLoading: false,
  //         data: userTerms
  //       });
  //     });
  //   });
  // }

  render() {
    const { classes } = this.props;
    const isLoading = this.state.isLoading;
    const data = this.state.data;

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
        { !data && 
        <p className="App-intro">
            There's nothing here, add a term!
        </p>
        }

        { data && data.length > 0 && <Terms data={data}/> }

        <Link to={routes.ENTER_TERM}>
          <Button variant="fab" color="primary" aria-label="Add" className={classes.fab}>
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

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withStyles(styles)(Home));
