import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import Firebase from 'firebase';

// import { initializeApp } from "firebase/app";
// import 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';







// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2CaZZD0GagTAeOFhGnrVRM_ki_bZAhIs",
  authDomain: "cart-56b7e.firebaseapp.com",
  projectId: "cart-56b7e",
  storageBucket: "cart-56b7e.appspot.com",
  messagingSenderId: "462914448198", 
  appId: "1:462914448198:web:d7fc3bc18c394ca2c1d347"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();


export default firebase;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
