import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,GoogleAuthProvider,getRedirectResult,
  signOut, signInWithRedirect
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { auth } from '../firebase/init.js';
import { createData } from '../firebase/firestore.js';

export const createUser = async (email, password,name) => {
  try {
    console.log('auth en create:', auth);
    const userCreated = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      
          );
          console.log(userCreated)
    userCreated.user.displayName=name
    userCreated.user.name=name
    return userCreated;
  } catch (error) {
    console.log(`Error creating an user: ${error.message}`);
    throw error;
  }
};


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


export const googleLog = async (auth, provider) => {
  try{
    const googleUser = await signInWithRedirect(auth, provider);
    return googleUser;
  } catch (error) {
    console.log(`Error while logging with google: ${error.message}`);
    throw error;
  }
}