import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAvCbxGStmHszrfQow-ZdI_ehmK_eok0kE",

  authDomain: "crudapp-fc0a3.firebaseapp.com",

  projectId: "crudapp-fc0a3",

  storageBucket: "crudapp-fc0a3.appspot.com",

  messagingSenderId: "1044442777814",

  appId: "1:1044442777814:web:1f0cd7fc4870c27e1be177"

};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
