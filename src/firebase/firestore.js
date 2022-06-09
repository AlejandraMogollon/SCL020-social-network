import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteField,
  deleteDoc,
  onSnapshot,
  orderBy,
  limit,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

import { db } from "../firebase/init.js";

//parametros de lo q queremos guardar (ej "ada")
export const createData = async (
  currentUser,
  textPost2,
  userEmail,
  displayName
) => {
  try {
    let postId = Math.random().toString(16).slice(2);

    const docRef = await addDoc(collection(db, "post"), {
      post: textPost2,
      date: Timestamp.now(),
      user: currentUser,
      mail: userEmail,
      nick: displayName,
      postId: postId,
    });
    // ;
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//para traer la data hacemos una Consulta(query) a la colleccion user donde le decimos que id sea igual al uid
//luego nos traemos los elementos de esa consulta y los retornamos segun la posicion y usando el .data que es ya algo del firebase
//ahora a feed
export const getUserData = async (userUid) => {
  const querySelector = await query(
    collection(db, "user"),
    where("id", "==", userUid)
  );
  const userFirebase = await getDocs(querySelector);
  return userFirebase.docs[0].data();
};

export const getPost = async () => {
  const querySnapshot = await getDocs(collection(db, "post"));
  let postArr = [];
  querySnapshot.forEach((doc) => {
    const docuData = doc.data();
    //al obj data se le agrega un campo id que hace refeencia al id de firestore
    docuData.id = doc.id;
    postArr.push(docuData);
  });
  return postArr;
};

export const deletePost = async (id) => {
  await deleteDoc(doc(db, "post", id));
  console.log("entre");
};

//VALIDAR QUE TEXTO POST NO ESTE VACIO

export const readPost = async (callback) => {
  // onSnapshot(query(collection(db, "post"), orderBy("date", "desc")), callback);
  onSnapshot(query(collection(db, "post"), orderBy("date", "desc")), (doc) => {
    let array = [];
    doc.docs.forEach((post) => {
      array.push({ id: post.id, data: post.data() });
      // console.log(post.id, post.data());
    });
    callback(array);
  });
};

// export const readPost2 = async (callback) => {
//   onSnapshot(query(collection(db, "post"), orderBy("date", "desc")), callback);
// };

// export const readDELETE = async (callback, caca) => {
//   query(collection(db, "post"), where("postId", "==", caca));
// };

// readDELETE((docu) => {
//   console.log(docu);
// });
export const getUserData2 = async (callback) => {
  const querySnapshot = await getDocs(collection(db, "post"));
  // for (let i in querySnapshot) {
  //   console.log(querySnapshot.docs[i]);
  // }
};
getUserData2((post) => {
  console.log(post);
});
