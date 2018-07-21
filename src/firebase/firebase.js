import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

if (!firebase.apps.length) { // if firebase hasn't been initialised, initialise it
  firebase.initializeApp(config);
}

const auth = firebase.auth();
const database = firebase.database();

export { 
  auth,
  database
};
