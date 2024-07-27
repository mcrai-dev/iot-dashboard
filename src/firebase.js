// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAnjCQWWOiL3-A7zRwyyEmQcA51FagHxT8",
  authDomain: "monitoring-423811.firebaseapp.com",
  databaseURL: "https://monitoring-423811-default-rtdb.firebaseio.com",
  projectId: "monitoring-423811",
  storageBucket: "monitoring-423811.appspot.com",
  messagingSenderId: "504772212612",
  appId: "1:504772212612:web:699900bb53a3d05209cfd1",
  measurementId: "G-KLNR3STH3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;
