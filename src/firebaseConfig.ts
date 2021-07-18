/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDW4m83xf6NzXzy67OjTu4g4K4NCdfxp_w",
  authDomain: "coinlabs-a7253.firebaseapp.com",
  projectId: "coinlabs-a7253",
  storageBucket: "coinlabs-a7253.appspot.com",
  messagingSenderId: "804231428389",
  appId: "1:804231428389:web:ca3b601911f0811a4902cc",
  measurementId: "G-1JSCYFX4MQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
