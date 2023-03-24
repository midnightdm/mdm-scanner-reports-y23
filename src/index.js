// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
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

// FirebaseUI config.
const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/status',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '/tos.html',
  callbacks: {
    signInSuccessWithAuthResult: function(authResult) {
      user.value - authResult.user.displayName;
      console.log(authResult);
      

      return false;
    }
  },
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('/privacy.html');
  }
};

import firebase from 'firebase/compat/app';
import { getAuth, signOut } from 'firebase/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { StoreModel as store } from  './StoreModel.js'
import './router.js'


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize the FirebaseUI Widget using Firebase.
store.ui = new firebaseui.auth.AuthUI(firebase.auth());
store.uiConfig = uiConfig;

// The start method will wait until the DOM is loaded.
//store.ui.start('#firebaseui-auth-container', uiConfig);

//Elements to manipulate
const signIn = document.getElementById('sign-in');

const initApp = function() {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // var displayName = user.displayName;
      // var email = user.email;
      // var emailVerified = user.emailVerified;
      // var photoURL = user.photoURL;
      // var uid = user.uid;
      // var phoneNumber = user.phoneNumber;
      // var providerData = user.providerData;
      store.user = user;
      store.isLoggedIn = true;

      user.getIdToken().then(function(accessToken) {
      
        document.getElementById('sign-in-status').textContent = 'Signed in';
        signIn.textContent = 'Sign out';
        signIn.classList.add("active");
        signIn.addEventListener('click', signOutUser);
        
        document.getElementById('account-details').textContent = JSON.stringify({
          displayName: store.user.displayName,
          email: store.user.email,
          emailVerified: store.user.emailVerified,
          phoneNumber: store.user.phoneNumber,
          photoURL: store.user.photoURL,
          uid: store.user.uid,
          accessToken: store.user.accessToken,
          providerData: store.user.providerData
        }, null, '  ');
      });
    } else {
      // User is signed out.
      document.getElementById('sign-in-status').textContent = 'Signed out';
      signIn.textContent = 'Sign in';
      signIn.classList.remove("active");
      document.getElementById('account-details').textContent = 'null';
    }
  }, function(error) {
    console.log(error);
  });
};

window.addEventListener('load', function() {
  initApp()
});

//Functions

//Signout handler

const signOutUser = function() {
  signOut(auth).then(()=>{
    store.user = null;
    store.isLoggedIn = false;
    console.log("logging out");
  }).catch((error) => { 
    console.log("Error logging out"+error)
  });
}
