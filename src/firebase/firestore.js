import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { db } from '../firebase/init.js';

const createData = async ()=> {
try {
  const docRef = await addDoc(collection(db, "caca"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
}
createData();