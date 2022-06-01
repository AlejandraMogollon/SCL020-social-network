import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { auth } from '../firebase/init.js';

export const createUser = async (email, password) => {
  try {
    console.log('auth en create:', auth);
    const userCreated = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCreated;
  } catch (error) {
    console.log(`Error creating an user: ${error.message}`);
    throw error;
  }
};

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

export const userLogIn = async (email, password) => {
  try {
    console.log('auth en login:', auth);
    const userLoged = await signInWithEmailAndPassword(auth, email, password);
    return userLoged;
  } catch (error) {
    console.log(`Error while logging: ${error.message}`);
    throw error;
  }
};

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
