/* eslint-disable */
import { onNavigate } from '../router/router.js';
import { auth } from '../firebase/init.js';
import { googleLog, redirectResult, userLogIn } from '../firebase/auth.js';

const login = () => {
  const templateLogin = `
            <main class='home'>
              <img class= 'logo-login' src='img/logo-Mediary.png' alt='logo-mediary'>
              <p class='welcome'> Mediary your space to share about books and its movie adaptations</p>
              <div class='user-input'>
                <p class='input-text-intro'> Enter email and password to sign In</p>
                <input class='email' type='text' value='' placeholder='email '>
                <input class='password' type='password' value='' placeholder='password '>
                <button id='login' class='log-in'>Log In</button>
                <a href=''>Forgot Password?</a>
              </div>
              <button id='signInGoogle' class='sign-in-google'> <img class='logo-google' src='img/logo-Google.png' alt='logo-Google'> Sign In with Google</button>
            <div class='registration'>
                <p> Don't have an account?  <button class='btnSignUp' id='btnSignUp'  >Sign Up here</button></p>
            </div>      
            </main> `;

  //  TEMPLATE LOGIN A LOGINCONTAINER (DIV) =//
  const loginContainer = document.createElement('div');
  loginContainer.className = 'login-container';
  loginContainer.innerHTML = templateLogin;
  // ======== BOTON LOGIN - ONCLICK => SYNC - SIGNINMAILPSS (FIREBASE) -> ONNAVIGATE(FEED)
  const bntLogin = loginContainer.querySelector('.log-in');
  bntLogin.addEventListener('click', async () => {
    const email = loginContainer.querySelector('.email').value;
    const password = loginContainer.querySelector('.password').value;

    await userLogIn(email, password);
    onNavigate('/feed');
  });
  // ========FORGOT PASSWORD??'PASSWORD_RESET' ========//

  // ========BOTON LOGIN GOOGLE - ONCLICK => SYNC - GOOGLE PROVIDER (FIREBASE) -> ONNAVIGATE(FEED)
  const signInGoogle = loginContainer.querySelector('.sign-in-google');
  signInGoogle.addEventListener('click', async () => {
    await googleLog();
    redirectResult(auth);
    onNavigate('/feed');
  });

  // ======== BOTON SIGN UP - ONCLICK => ONNAVIGATE(SIGNUP)//========
  const signUpBtn = loginContainer.querySelector('.btnSignUp');
  signUpBtn.addEventListener('click', () => {
    onNavigate('/signup');
  });

  return loginContainer;
};

export default login;
