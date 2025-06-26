//// src/firebase.js
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
//import 'firebase/compat/firestore';
//import 'firebase/compat/storage'; // Dodajte ta uvoz za Storage
//
//const firebaseConfig = {
//    apiKey: "AIzaSyA2q1ELsv2jl9YQO1ZTk5ysbZxAXKuoLOY",
//    authDomain: "coins-c790a.firebaseapp.com",
//    databaseURL: "https://coins-c790a-default-rtdb.europe-west1.firebasedatabase.app",
//    projectId: "coins-c790a",
//    storageBucket: "coins-c790a.firebasestorage.app",
//    messagingSenderId: "662586382641",
//    appId: "1:662586382641:web:3f479a55bf2fe9a0083810",
//    measurementId: "G-H307C173D6"
//  };
//
//firebase.initializeApp(firebaseConfig);
//
//export const auth = firebase.auth();
//export const firestore = firebase.firestore();
//export const storage = firebase.storage();  // Izvozite Storage
//export default firebase;



// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';  // Za Storage

const firebaseConfig = {
  apiKey: "AIzaSyANSiKsJngpVLsrMCfLvr6AYbe8DLCehn0",
  authDomain: "the-euro-coin-collector-app.firebaseapp.com",
  projectId: "the-euro-coin-collector-app",
  storageBucket: "the-euro-coin-collector-app.firebasestorage.app",
  messagingSenderId: "899973642654",
  appId: "1:899973642654:web:97e93517ee4d431534be8f",
  measurementId: "G-GQWFC00PSG"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
