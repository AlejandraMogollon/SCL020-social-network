import {
  collection,
  addDoc,
  Timestamp,
  getDocs,
  getDoc,
  query,
  where,
  doc,
  updateDoc,
  deleteField,
  deleteDoc,
  onSnapshot,
  orderBy,
  limit,
  arrayRemove,
  arrayUnion,
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
    let postId = Math.random().toString(16).slice(2);

    const docRef = await addDoc(collection(db, 'post'), {
      post: textPost2,
      date: Timestamp.now(),
      user: currentUser,
      mail: userEmail,
      nick: displayName,
      postId: postId,
      LikeCount: 0,
      UsersWhoLiked: [],
    });
    // ;
    return docRef.id;
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
  return userFirebase.docs[0].data();
};

export const getPost = async () => {
  const querySnapshot = await getDocs(collection(db, 'post'));
  let postArr = [];
  querySnapshot.forEach((doc) => {
    const docuData = doc.data();
    //al obj data se le agrega un campo id que hace refeencia al id de firestore
    docuData.id = doc.id;
    postArr.push(docuData);
  });
  return postArr;
};

export const getPostById = async (postId) => {
  const docRef = doc(db, 'post', postId);
  const docPost = await getDoc(docRef);
  if (docPost.exists()) {
    // console.log('Document data:', docPost.data());
    return {
      postData: docPost.data(),
      docRef,
    };
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
};

export const deletePost = async (id) => {
  await deleteDoc(doc(db, 'post', id));
  console.log('entre');
};

//VALIDAR QUE TEXTO POST NO ESTE VACIO

export const readPost = async (callback) => {
  onSnapshot(query(collection(db, 'post'), orderBy('date', 'desc')), (doc) => {
    let array = [];
    doc.docs.forEach((post) => {
      array.push({ id: post.id, data: post.data() });
    });
    callback(array);
  });
};

export const editPost = async (id, editPost) => {
  await updateDoc(doc(db, 'post', id), { post: editPost });
  console.log(editPost);
};

export const likeStatus = async (postId, userUid) => {
  postId = postId.replace('like-', '');
  const postInfo = await getPostById(postId);
  const arrUserLiked = postInfo.postData.UsersWhoLiked;
  console.log('Arrr', arrUserLiked);
  let likeCount = postInfo.postData.LikeCount;
  if (arrUserLiked.includes(userUid)) {
    // arrUserLiked: arrayRemove(userUid);
    await updateDoc(postInfo.docRef, {
      UsersWhoLiked: arrayRemove(userUid),
      LikeCount: likeCount - 1,
    });
    return true;
  } else {
    // arrUserLiked: arrayUnion(userUid);
    await updateDoc(postInfo.docRef, {
      UsersWhoLiked: arrayUnion(userUid),
      LikeCount: likeCount + 1,
    });
    return false;
  }
};
