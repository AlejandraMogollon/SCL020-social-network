// import { async } from 'regenerator-runtime';
// import { signOut } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js';
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';
// import { async } from 'regenerator-runtime';
import { signInWithEmailAndPassword, auth, signOut }
  // , GoogleAuthProvider, getAuth, initializeApp,
  from '../src/firebase/init.js';
import { userLogIn, logOut } from '../src/firebase/auth.js';
import { onNavigate } from '../src/router/router.js';

jest.mock('../src/firebase/init.js', () => ({
  auth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  getAuth: jest.fn(),
  initializeApp: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
}));

describe('Test signIn', () => {
  const email = 'hola@gmail.com';
  const password = '123456';
  it('debería llamar signInWithEmailAndPassword', async () => {
    await userLogIn(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
  it('debería llamar signInWithEmailAndPassword with arguments', async () => {
    await userLogIn(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });
});

describe('Test signOut', () => {
  it('debería llamar signOut', async () => logOut().then(() => {
    expect(signOut).toBe(onNavigate('/'));
  }));
});
