import { onNavigate } from '../router/router.js';
import { provider, auth } from '../firebase/init.js';

import { googleLog, userLogIn } from '../firebase/auth.js';
const login = () => {
  const templateLogin = `
        <section>
            <main class="home">
            <div class="logo">
                <img src="img/logo-Mediary.png" alt="logo-mediary">
            </div>
            <p class="welcome"> Mediary your space to share about books and its movie adaptations</p>
            <p class="input-text-intro"> Enter your email and password to Sign In</p>
            <div class="user-input">
                <input class="email" type="text" value="" placeholder="email ">
                <input class="password" type="password" value="" placeholder="password ">
                <button id="login" class="log-in">Log In</button>
                <a href="">Forgot Password?</a>
            </div>
            <button id="signInGoogle" class="sign-in-google"> <img src="img/logo-Google.png" alt="logo-Google"> Sign In with Google</button>
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
  login.addEventListener('click', async () => {
    const email = loginContainer.querySelector('.email').value;
    const password = loginContainer.querySelector('.password').value;

    const userLoged = await userLogIn(email, password);
    console.log('aqui es el userlog:', userLoged);
    onNavigate('/feed');
    console.log('click login lleva a feed');
  });
  //========FORGOT PASSWORD??'PASSWORD_RESET' ========//

  //========BOTON LOGIN GOOGLE - ONCLICK => SYNC - GOOGLE PROVIDER (FIREBASE) -> ONNAVIGATE(FEED)======
  const signInGoogle = loginContainer.querySelector('.sign-in-google');
  signInGoogle.addEventListener('click', async () => {
    const googleUser = await googleLog(auth, provider); //retorna una promesa
    onNavigate('/feed');
  });

  //======== BOTON SIGN UP - ONCLICK => ONNAVIGATE(SIGNUP)//========
  const signUpBtn = loginContainer.querySelector('.btnSignUp');
  signUpBtn.addEventListener('click', () => {
    onNavigate('/signup');
    console.log('click signup lleva a la pag signup');
  });

  return loginContainer;
};

export default login;
