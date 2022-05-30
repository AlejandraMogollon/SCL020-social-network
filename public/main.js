// Este es el punto de entrada de tu aplicacion

import { myFunction } from './lib/index.js';
// myFunction();
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';

// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// mover  src/configFirebase.js
const firebaseConfig = {
  apiKey: 'AIzaSyDNA-5HXp5zYPdjxVtgxFdA3C7qZeKLrc4',
  authDomain: 'mediary-946d7.firebaseapp.com',
  projectId: 'mediary-946d7',
  storageBucket: 'mediary-946d7.appspot.com',
  messagingSenderId: '135854047347',
  appId: '1:135854047347:web:13ebfb59ec9a338ee12a06',
  measurementId: 'G-DPX4FWG803',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const signUp = document.getElementById('signup');
signUp.addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(typeof userCredential);
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
});

const signInGoogle = document.getElementById('signInGoogle');
signInGoogle.addEventListener('click', () => {
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log('Sign-in successful.');
      // The signed-in user info.
      const user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});

const closeSession = document.getElementById('signOut');
closeSession.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('Sign-out successful.');
    })
    .catch((error) => {
      // An error happened.
    });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    // ...
  } else {
    // User is signed out
    console.log('Sign-out');
    console.log(uid);

    // ...
  }
});
