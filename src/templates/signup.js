import { createUser } from '../firebase/auth.js';
import { onNavigate } from '../router/router.js';


const signUp = () => {
  const templateSignUp = `
 <section>
    <main class="main-signup">
      <div class="logo">
        <img src="img/logo-Mediary.png" alt="logo-mediary">
      </div>
      <p class="p-signup-msge"> Create an account to start sharing</p>
      <div class="user-input">
        <input class="name" type="text" value="" placeholder="name" required>
        <input class="email" type="text" value="" placeholder="email ">
        <input class="password" type="password" value="" placeholder="password ">
        <button class="button-signup">Sign Up</button>
        <button class="have-account">Already have an account?</button>
      </div> 
    </main>
  </section> `;

  //TEMPLATE SIGNUP A SIGNUPCONTAINER (DIV)
  const signUpContainer = document.createElement('div');
  signUpContainer.innerHTML = templateSignUp;

  //BUTTON ALREADY HAVE AN ACCOUNT -ONCLICK => -> ONNAVIGATE(LOGIN);
  const buttonHaveAcc = signUpContainer.querySelector('.have-account');
  buttonHaveAcc.addEventListener('click', () => {
    console.log('di click:', buttonHaveAcc);
    onNavigate('/');
  });

  //BUTTON SIGN UP -ONCLICK => CREATEUSERMAILPSS (FIREBASE) -> ONNAVIGATE(FEED);
  const buttonSignUp = signUpContainer.querySelector('.button-signup');
  buttonSignUp.addEventListener('click', async () => {
    if(signUpContainer.querySelector('.name').value!==""){
    const name = signUpContainer.querySelector('.name').value;
    const email = signUpContainer.querySelector('.email').value;
    const password = signUpContainer.querySelector('.password').value;
    const fbResponse = await createUser(email, password, name);
    console.log('este es el user log', fbResponse.user.uid);
    onNavigate('/feed');}else{alert('You must provide a Name')}
    // console.log(`this is the uid created user: ${user.uid}`);
  });
  
  return signUpContainer;
};

export default signUp;
