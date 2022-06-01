import { onNavigate } from '../router/router.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import {auth} from './firebase/init.js'

onAuthStateChanged(auth, (user) => {
  if (user) {
      console.log(`user: ${user}`)
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
  } else {
      console.log(`onAuthStateChanged - user signout`)
      console.log(user)
    // User is signed out
  }
})

onNavigate(window.location.pathname);
