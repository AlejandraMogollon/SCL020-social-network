import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
} from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js';
import { db } from '../firebase/init.js';

//parametros de lo q queremos guardar (ej "ada")
export const createData = async (
  currentUser,
  textPost2,
  userEmail,
  displayName
) => {
  try {
    const docRef = await addDoc(collection(db, 'post'), {
      post: textPost2,
      date: Timestamp.now(),
      user: currentUser,
      mail: userEmail,
      nombrecito: displayName,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

//para traer la data hacemos una Consulta(query) a la colleccion user donde le decimos que id sea igual al uid
//luego nos traemos los elementos de esa consulta y los retornamos segun la posicion y usando el .data que es ya algo del firebase
//ahora a feed
export const getUserData = async (userUid) => {
  const querySelector = await query(
    collection(db, 'user'),
    where('id', '==', userUid)
  );
  const userFirebase = await getDocs(querySelector);
  //     console.log(userFirebase.docs[0].data())
  //     console.log(db)
  // console.log(collection)

  return userFirebase.docs[0].data();
};

// export const getPosts = async () => {
//   const querySelector = await query(
//     collection(db, 'post'),
//     where('post', '==', true)
//   );
//   const userFirebase = await getDocs(querySelector);

//   return userFirebase.docs[0].data();
// };

// export const getPost = async () => {
// const querySnapshot = await getDocs(collection(db, "post"));

//   console.log(querySnapshot._snapshot)
// return querySnapshot

// }

//POSTSSSSSSS
export const getPost = async () => {
  const querySnapshot = await getDocs(collection(db, 'post'));
  let postArr = [];
  querySnapshot.forEach((doc) => {
    // let prueba = [...Object.keys(doc.data())]
    // console.log(prueba)
    // let docuObj = doc.data();
    postArr.push(doc.data());
    // console.log(docuObj.post)
    //let docuString = JSON.stringify(doc.data())
  });
  return postArr;
};
// console.log(querySnapshot)
// console.log(`${doc.id}`)
