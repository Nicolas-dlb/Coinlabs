/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from "firebase";

 var firebaseConfig = {
    apiKey: "AIzaSyCAZNLwunpTa5bzkmg6vQpnnYv5P6Of6aI",
    authDomain: "coin-c6de3.firebaseapp.com",
    projectId: "coin-c6de3",
    storageBucket: "coin-c6de3.appspot.com",
    messagingSenderId: "1075474447987",
    appId: "1:1075474447987:web:12521aec1de2b8c58f7406"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };