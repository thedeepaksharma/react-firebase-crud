import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyA7EyYPmdAnGqlGiR3rYWwCoHRk2HI6WdI",
  authDomain: "fire-crud-on.firebaseapp.com",
  databaseURL: "https://fire-crud-on-default-rtdb.firebaseio.com",
  projectId: "fire-crud-on",
  storageBucket: "fire-crud-on.appspot.com",
  messagingSenderId: "149192611581",
  appId: "1:149192611581:web:e1c31fed0ccbdf4f045094"
};

// Initialize Firebase
var fireDB = firebase.initializeApp(firebaseConfig);

export default fireDB.database().ref();
