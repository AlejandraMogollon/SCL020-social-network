import { auth, provider, db, createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  signInWithPopup, collection,
  addDoc,
  Timestamp,} from './init.js';
import { onNavigate } from '../router/router.js';

export const createUser = async (email, password, name) => {
  try {
    // Aqui creamos es un Auth (Esto no es un usuario)
    // en firebase solo funciona para logearse. No permite agregar
    // mas campos como nombre,photoUrl,telefono
    // console.log('auth en create:', auth);
    const userCreated = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // Aca se crea una collection User y se agregan los campos extras necesarios.
    // incluyendo mail, nick
    // el id usado es el mismo uid de firebase
    // ahora a firestore
    await addDoc(collection(db, 'user'), {
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
      case 'Firebase: Error (auth/invalid-email).':
        alert('Not a valid Email');// eslint-disable-line no-alert
        break;
      case 'Firebase: Error (auth/email-already-in-use).':
        alert('Email is already in use');// eslint-disable-line no-alert
        break;
      case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
        alert('Password should be at least 6 characters');// eslint-disable-line no-alert
        break;
      case 'Firebase: Error (auth/missing-email).':
        alert('Missing email');// eslint-disable-line no-alert
        break;
      case 'Firebase: Error (auth/internal-error).':
        alert('Need a Password');// eslint-disable-line no-alert
        break;
      default:
        // do nothing
    }
    // console.log(`Error creating an user: ${error.message}`);
    throw error;
  }
};
export const userLogIn = async (email, password) => {
  try {
    // console.log('auth en login:', auth);
    const userLoged = await signInWithEmailAndPassword(auth, email, password);
    return userLoged;
  } catch (error) {
    switch (error.message) {
      case 'Firebase: Error (auth/invalid-email).':
        alert('Something went wrong, check your email or password');// eslint-disable-line no-alert
        break;
      case 'Firebase: Error (auth/user-not-found).':
        alert('User is not register, signup for login');// eslint-disable-line no-alert
        break;
      case 'Firebase: Error (auth/wrong-password).':
        alert('Something went wrong, check your email or password');// eslint-disable-line no-alert
        break;
      case 'Firebase: Error (auth/internal-error).':
        alert('Something went wrong, check your email or password');// eslint-disable-line no-alert
        break;
      default:
        // do nothing
    }
    throw error;
  }
};
// export const googleLog = async () => {
//   await signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       // console.log(user.name)
//     }).catch(() => {
//       // Handle Errors here.
//       // const errorCode = error.code;
//       // const errorMessage = error.message;
//       // The email of the user's account used.
//       // const email = error.customData.email;
//       // The AuthCredential type that was used.
//       // const credential = GoogleAuthProvider.credentialFromError(error);
//     });
// };
export const googleLog = async () => {
  try{
  await signInWithPopup(auth, provider)
    
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // console.log(user.name)
    } catch (error)  {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    }
  }
export const redirectResult = async (auth) => {
  await getRedirectResult(auth)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access Google APIs.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
    }).catch(() => {
    // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
    // The email of the user's account used.
      // const email = error.customData.email;
    // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
    });
};
export const listAuth = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
      // user.uid;
    } else {
    // User is signed out
    }
  });
};

// export const logOut = async (auth) => {
//   signOut(auth)
//     .then(() => {
//       onNavigate('/');
//     })
//     .catch(() => {
//       // error
//     });

// prueba --- borrar dp
export const logOut = async (auth) => {
  try{ 
    await signOut(auth);
  } catch (error)  {
      // error
    };
};
