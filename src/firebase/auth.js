import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  signOut,
  signInWithRedirect,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { auth } from "../firebase/init.js";
import { createData } from "../firebase/firestore.js";
import { db } from "../firebase/init.js";

export const createUser = async (email, password, name) => {
  try {
    // Aqui creamos es un Auth (Esto no es un usuario)
    //en firebase solo funciona para logearse. No permite agregar mas campos como nombre,photoUrl,telefono
    // console.log('auth en create:', auth);
    const userCreated = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Aca se crea una collection User y se agregan los campos extras necesarios. incluyendo mail, nick
    // el id usado es el mismo uid de firebase
    //ahora a firestore
    await addDoc(collection(db, "user"), {
      date: Timestamp.now(),
      id: userCreated.user.uid,
      mail: email,
      password,
      nick: name,
      // photoURL
    });
    return userCreated;
  } catch (error) {
    switch (error.message) {
      case "Firebase: Error (auth/invalid-email).":
        alert("Not a valid Email");
        break;
      case "Firebase: Error (auth/email-already-in-use).":
        alert("Email is already in use");
        break;
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        alert("Password should be at least 6 characters");
        break;
      case "Firebase: Error (auth/missing-email).":
        alert("Missing email");
        break;
      case "Firebase: Error (auth/internal-error).":
        alert("Need a Password");
        break;
    }
    console.log(`Error creating an user: ${error.message}`);
    throw error;
  }
};

export const userLogIn = async (email, password) => {
  try {
    // console.log('auth en login:', auth);
    const userLoged = await signInWithEmailAndPassword(auth, email, password); //return user credentials
    return userLoged;
  } catch (error) {
    switch (error.message) {
      case "Firebase: Error (auth/invalid-email).":
        alert("Something went wrong, check your email or password");
        break;
      case "Firebase: Error (auth/user-not-found).":
        alert("User is not register, signup for login");
        break;
      case "Firebase: Error (auth/wrong-password).":
        alert("Something went wrong, check your email or password");
        break;
      case "Firebase: Error (auth/internal-error).":
        alert("Something went wrong, check your email or password");
        break;
    }
    console.log(`Error while logging: ${error.message}`);
    throw error;
  }
};

//REVISAR - PROBLEMAS ONNAVIGATE, VUELVE A LOGIN EN VEZ DE FEED
export const googleLog = async (auth, provider) => {
  try {
    const googleUser = await signInWithRedirect(auth, provider);
    return googleUser;
  } catch (error) {
    console.log(`Error while logging with google: ${error.message}`);
    throw error;
  }
};

export const logOut = async (auth) => {
  signOut(auth)
    .then(() => {
      console.log("Sign-out successful.");
    })
    .catch((error) => {
      console.log(error, "An error happened.");
    });
};

//CURRENT PARA FILTRADO??
// export const currentUserApp = async (auth) => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       const uid = user.uid;
//       console.log(uid);

//       return uid; // ...
//     } else {
//       // User is signed out
//       // ...
//     }
//   });
// };
// currentUserApp(auth);
// console.log(currentUserApp(auth));
