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

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Set up firebase
var config = {
  apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};
let app = firebase.initializeApp(config);
let auth = app.auth();
let database = app.database();

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

//   // when running setstate, complains that it's not a function
//   authStateObserver(user) {
//     if (user) {
//       console.log('auth state changed! user is signed in');
//       //console.log(user);
//     } else {
//       console.log('auth state changed! user not signed in');
//     }
//     //   this.setState({
//     //     isLoading: false
//     //   });
//       //this.updateee(user);
//   }

  initFirebaseAuth() {
    // Listen to auth state changes.
    //console.log(this.authStateObserver); // not a function??
    // auth.onAuthStateChanged(this.authStateObserver);
    auth.onAuthStateChanged((user) => {
      let userId = auth.currentUser.uid;

      let userTerms = [];

      let termsRef = database.ref('user-terms/' + userId);
      termsRef.on('value', (snapshot) => {
        snapshot.forEach((childSnapShot) => {
          userTerms.push(childSnapShot.val());
        });
        this.setState({
          isLoading: false,
          data: userTerms,
          userId: userId
        });
        console.log(this.state.data);
      });
    });
  }

  signIn() {
    firebase.auth().signInAnonymously();
  }

  componentDidMount() {
    this.setState({
        isLoading: true
    });
    this.signIn();
    this.initFirebaseAuth();
    // this.loadData();
  }

  render() {
    const { classes } = this.props;
    const isLoading = this.state.isLoading;
    const data = this.state.data;
    const userId = this.state.userId;

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

        { data.length > 0 && <Terms data={data} databaseRef={database} userId={userId}/> }
        <Link to={routes.ENTER_TERM}>
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