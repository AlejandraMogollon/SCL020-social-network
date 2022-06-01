import { onNavigate } from '../router/router.js';
// import { auth, provider } from '../firebase/init.js';
// import {
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithRedirect,
//   getRedirectResult,
// } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { userLogIn } from '../firebase/auth.js';
const login = () => {
  const templateLogin = `
        <section>
            <main class="home">
            <div class="logo">
                <img src="img/logo-Mediary.png" alt="logo-mediary">
            </div>
            <p class="welcome"> Mediary your space to share about books and its movie adaptations</p>
            <div class="user-input">
                <input class="email" type="text" value="" placeholder="email ">
                <input class="password" type="text" value="" placeholder="password ">
                <button id="login" class="log-in">Log In</button>
                <a href="">Forgot Password?</a>
            </div>
            <img src="https://source.unsplash.com/random/500x400" width="80px"alt="Random Image">
            <div class="separation-div"> --- o --- </div>
            <button id="signInGoogle" class="sign-in-google"> <img src="img/logo-Google.png" alt="logo-Google">  Google</button>
            <div class="registration">
                <p> Don't have an account?  <button class="btnSignUp" id="btnSignUp"  >Sign Up here</button></p>
            </div>      
            </main>
        </section> `;

  //= TEMPLATE LOGIN A LOGINCONTAINER (DIV) =//
  const loginContainer = document.createElement('div');
  loginContainer.innerHTML = templateLogin;
  //======== BOTON LOGIN - ONCLICK => SYNC - SIGNINMAILPSS (FIREBASE) -> ONNAVIGATE(FEED)
  const login = loginContainer.querySelector('.log-in');
  const email = loginContainer.querySelector('.email').value;
  const password = loginContainer.querySelector('.password').value;

  login.addEventListener('click', async () => {
    console.log(email);
    const userLoged = await userLogIn(email, password);
    console.log('aqui es el userlog:', userLoged);
    onNavigate('/feed');
    console.log('click login lleva a feed');

    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     console.log('signed in');
    //     const user = userCredential.user;
    //     // ...
    //   })
    //   .catch((error) => {
    //     console.log(`error: ${error}`);
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     //["invalid-email" /* INVALID_EMAIL */]: 'The email address is badly formatted.',
    //   });
    // onNavigate('/feed');
    // console.log('click login lleva a feed');
  });

  //========FORGOT PASSWORD??'PASSWORD_RESET' ========//

  //========BOTON LOGIN GOOGLE - ONCLICK => SYNC - GOOGLE PROVIDER (FIREBASE) -> ONNAVIGATE(FEED)======
  const signInGoogle = loginContainer.querySelector('.sign-in-google');
  signInGoogle.addEventListener('click', () => {
    //signInWithRedirect(auth, provider);//retorna una promesa
    console.log('boton google');
    onNavigate('/feed');
  });

  //======== BOTON SIGN UP - ONCLICK => ONNAVIGATE(SIGNUP)//========
  const signUpBtn = loginContainer.querySelector('.btnSignUp');
  signUpBtn.addEventListener('click', () => {
    onNavigate('/signup');
    console.log('click signup lleva a la pag signup');
  });

  // getRedirectResult(auth)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access Google APIs.
  //     console.log(getRedirectResult(auth), new Date)
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;

  //     // The signed-in user info.
  //     const user = result.user;
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });

  return loginContainer;
};

export default login;
