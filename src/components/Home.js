import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LoadingAnimation from './LoadingAnimation';

import Terms from './Terms';

import { Link } from "react-router-dom";
import * as routes from '../constants/routes';
import { auth } from '../firebase';
import { database } from '../firebase/firebase';

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

const AddTermFab = (props) => 
  <Link to={routes.ENTER_TERM}>
    <Button variant="fab" color="primary" aria-label="Add" className={props.classes.fab}>
      <AddIcon />
    </Button>
  </Link>

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  };

  // Doesn't move on to loading state. User exists
  componentWillMount() {
    let termsRef = database.ref('/user-terms/' + auth.getUid());
    let userTerms = [];
    termsRef.on('value', (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        userTerms.push(childSnapShot.val());
      });
      this.setState({
        isLoading: false,
        data: userTerms.sort((userTermA, userTermB) => {
          return userTermA.term.toLowerCase() > userTermB.term.toLowerCase();
        })
      });
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
        <LoadingAnimation classes={classes}/>
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

        <AddTermFab classes={classes}/>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(withStyles(styles)(Home));
