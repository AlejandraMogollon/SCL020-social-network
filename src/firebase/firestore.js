
import { collection, addDoc, Timestamp, getDocs } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { db } from '../firebase/init.js';
//parametros de lo q queremos guardar (ej "ada")
export const createData = async (currentUser,textPost2, userEmail,displayName)=> {
try {
  const docRef = await addDoc(collection(db, "post"), {
    post: textPost2,
    date:  Timestamp.now(),
    user: currentUser,
    mail: userEmail,
    nombrecito: displayName,
  });
  console.log("Document written with ID: ",  docRef.id);
  
  
  
} catch (e) {
  console.error("Error adding document: ", e);
}
}


// export const getPost = async () => {
// const querySnapshot = await getDocs(collection(db, "post"));

//   console.log(querySnapshot._snapshot)
// return querySnapshot

// }


//POSTSSSSSSS
// const querySnapshot = await getDocs(collection(db, "post"));
// querySnapshot.forEach((doc) => {
//   let prueba = [...Object.values(doc.data())]
//   console.log(prueba)
//   console.log(`${doc.id} => ${doc.data()}`);
//   ;
// });
// console.log(querySnapshot)
// console.log(`${doc.id}`)
// getPost()






