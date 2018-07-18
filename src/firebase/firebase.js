import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_WEB_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(config);

function writeUserData(userId) {
  firebase.database().ref('users/' + userId).set({
    terms: {}
  });
};

function writeNewTerm(uid) {
  // A term entry.
  const termData = {
    acronym: '',
    term: 'Android',
    definition: 'Mobile operating system, based on the Linux kernel.',
    tags: ['android', 'mobile', 'operating systems']
  };
  
  // Get a key for a new term.
  var newTermKey = firebase.database().ref().child('terms').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/user-terms/' + uid + '/' + newTermKey] = termData;

  // Push the reference update
  return firebase.database().ref().update(updates);
}

// if the user is new, create a new element for the data
function createUserTermData(userId) {
    firebase.database().ref('users/' + userId).set({
      terms: {}
    });
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('auth changed!');
    console.log(user);
    var userId = firebase.auth().currentUser.uid;
    //writeUserData(userId)
    //writeNewTerm(userId);
  } else {
    // No user is signed in.
    console.log('no user')
  }
});

const signInAnonymously = () => {
    firebase.auth().signInAnonymously()
    .then(createUserTermData)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
    });
}

// let res = firebase.auth()
//   .signInWithEmailAndPassword('email@gmail.com', '')
//   .then(() => {
//     var userId = firebase.auth().currentUser.uid;
//     console.log(userId);
//     writeUserData(userId);
//   })
//   .catch(function(error) {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(errorCode);
//     console.log(errorMessage);
//   }
// );
// console.log(res);

export {
    signInAnonymously,
    writeNewTerm,
};