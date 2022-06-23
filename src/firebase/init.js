/* eslint-disable */
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import {
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  Timestamp,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
  
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js';
import config from './config.js';

const app = initializeApp(config);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const db = getFirestore(app);

export {
  app,
  auth,
  provider,
  db,
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  collection,
  addDoc,
  Timestamp,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
  
};
