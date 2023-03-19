// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVBHUCEWUOxlThsLNp6L3oeket5tEqEY4",
  authDomain: "scanner-reports-y23.firebaseapp.com",
  projectId: "scanner-reports-y23",
  storageBucket: "scanner-reports-y23.appspot.com",
  messagingSenderId: "207526989402",
  appId: "1:207526989402:web:4df85612c2847d84cd1263"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import './router.js'
