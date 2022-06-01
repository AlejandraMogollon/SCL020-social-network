import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
import { onNavigate } from '../router/router.js';
import { auth } from '../firebase/init.js';
import { validateEmail, validatePss } from '../utility.js';

const signUp = () => {
  const templateSignUp = `
 <section>
    <main class="main-signup">
      <div class="logo">
        <img src="img/logo-Mediary.png" alt="logo-mediary">
      </div>
      <p class="p-signup-msge"> Create an account to start sharing</p>
      <div class="user-input">
        <input class="email" type="text" value="" placeholder="email ">
        <input class="password" type="text" value="" placeholder="password ">
        <button class="button-signup">Sign Up</button>
        <a href="">Already have an account?</a>
      </div> 
    </main>
  </section> `;

//TEMPLATE SIGNUP A SIGNUPCONTAINER (DIV)
  const signUpContainer = document.createElement('div');
  signUpContainer.innerHTML = templateSignUp;
//BUTTON SIGN UP -ONCLICK => CREATEUSERMAILPSS (FIREBASE) -> ONNAVIGATE(FEED);
  const buttonSignUp = signUpContainer.querySelector('.button-signup');
  buttonSignUp.addEventListener('click', () => {
    
    const email = signUpContainer.querySelector('.email').value;
    const password = signUpContainer.querySelector('.password').value;  
    if (validateEmail(email) && validatePss(password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          onNavigate('/feed');
          console.log(`this is the uid created user: ${user.uid}`);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('erroooorr');
          // ..
        });
    } else {
      console.log('no cree nada');
    }
  });
//ALREADYACCOUNT -ONCLICK => ??;
  return signUpContainer;
};

export default signUp;
