import { createUser } from '../firebase/auth.js';
import { onNavigate } from '../router/router.js';

const signUp = () => {
  const templateSignUp = `
    <main class='signup'>
        <img src='img/logo-Mediary.png' alt='logo-mediary'>
      <p class='p-signup-msge'> Create an account to start sharing</p>
      <div class='user-input'>
        <input class='name' type='text' value='' placeholder='name' required>
        <input class='email' type='text' value='' placeholder='email '>
        <input class='password' type='password' value='' placeholder='password '>
        <button class='button-signup'>Sign Up</button>
        <button class='have-account'>Already have an account?</button>
      </div> 
    </main>`;

  const signUpContainer = document.createElement('div');
  signUpContainer.className = 'signup-container';
  signUpContainer.innerHTML = templateSignUp;

  const buttonHaveAcc = signUpContainer.querySelector('.have-account');
  buttonHaveAcc.addEventListener('click', () => {
    onNavigate('/');
  });

  const buttonSignUp = signUpContainer.querySelector('.button-signup');
  buttonSignUp.addEventListener('click', async () => {
    if (signUpContainer.querySelector('.name').value !== '') {
      const name = signUpContainer.querySelector('.name').value;
      const email = signUpContainer.querySelector('.email').value;
      const password = signUpContainer.querySelector('.password').value;
      await createUser(email, password, name);
      onNavigate('/feed');
    } else {
      alert('You must provide a Name');// eslint-disable-line no-alert
    }
  });

  return signUpContainer;
};

export default signUp;
