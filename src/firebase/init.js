import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
import { GoogleAuthProvider,getAuth } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

import config from './config.js';

const app = initializeApp(config);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const db = getFirestore(app);
//DATABASE 

export {app, auth, provider, db};
