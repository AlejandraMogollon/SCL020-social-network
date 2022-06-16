import { onNavigate } from "../router/router.js";
// import { listAuth } from "../.firebase/auth.js"

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//       // console.log(`user: ${user}`)
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User

//     const uid = user.uid;
//   } else {
//       console.log(`onAuthStateChanged - user signout`)
//       console.log(uid)
//     // User is signed out
//   }
// })

onNavigate(window.location.pathname);



// const listAuth = ()=>{
// // const auth = getAuth();
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     console.log(user)
    
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

// }
// listAuth()