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
    apiKey: "AIzaSyA2q1ELsv2jl9YQO1ZTk5ysbZxAXKuoLOY",
    authDomain: "coins-c790a.firebaseapp.com",
    databaseURL: "https://coins-c790a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "coins-c790a",
    storageBucket: "coins-c790a.firebasestorage.app",
    messagingSenderId: "662586382641",
    appId: "1:662586382641:web:3f479a55bf2fe9a0083810",
    measurementId: "G-H307C173D6"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
