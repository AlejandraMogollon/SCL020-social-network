import { signInWithEmailAndPassword, auth, signOut, signInWithPopup, provider, collection,Timestamp, addDoc }  from '../src/firebase/init.js';
import { userLogIn, logOut, googleLog, createUser } from '../src/firebase/auth.js';
import { onNavigate } from '../src/router/router.js';

jest.mock('../src/firebase/init.js', () => ({
  auth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  GoogleAuthProvider: jest.fn(),
  getAuth: jest.fn(),
  initializeApp: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  provider: jest.fn(),
  signInWithPopup: jest.fn(),
  addDoc: jest.fn(),
  collection:jest.fn(),
  db:jest.fn(),
  Timestamp :jest.fn(),
}));

describe('Test CreateUser', () => {
  const email = 'hola@gmail.com';
  const password = '123456';
  const name ="hola"
  it('debería llamar createUserWithEmailAndPassword', async () => {
    await createUser(email, password,name);
    await addDoc(collection(db,'user'))
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
//   it('debería llamar signInWithEmailAndPassword with arguments', async () => {
//     await userLogIn(email, password);
//     expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
//   });
});

describe('Test userLogIn', () => {
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

describe('Test googleLog', () => {
   it('debería llamar signInWithPopup', async () => {
    await googleLog(auth, provider);
    expect(signInWithPopup).toHaveBeenCalled();
  });
   it('debería llamar signInWithPopup with auth y provider', async () => {
    await googleLog(auth, provider);
    expect(signInWithPopup).toHaveBeenCalledWith(auth, provider);
  });
});

describe('Test logOut', () => {
   it('debería llamar signOut', async () => {
    await logOut(auth);
    expect(signOut).toHaveBeenCalled();
  });
   it('debería llamar signOut with auth?', async () => {
    await logOut(auth);
    expect(signOut).toHaveBeenCalledWith(auth);
  });
});


