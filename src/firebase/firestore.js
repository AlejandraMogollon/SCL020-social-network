import { collection, addDoc, Timestamp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { db } from '../firebase/init.js';
//parametros de lo q queremos guardar (ej "ada")
export const createData = async (currentUser)=> {
try {
  const docRef = await addDoc(collection(db, "caca"), {
    post: "Ada",
    date:  Timestamp.now(),
    user: currentUser
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
}

