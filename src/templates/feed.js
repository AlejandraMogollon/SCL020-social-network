import { onNavigate } from '../router/router.js';
import { auth } from '../firebase/init.js';
import { createData, getPost, getUserData } from '../firebase/firestore.js';
import { signOut } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'; //sacar de acá!

const feed = async () => {
  const templateFeed = ` <header>
    <nav>
      <img src="img/menu-icon.png" alt="">
      <img class="logo-mediary-nav"src="img/logo-Mediary.png" alt="">
      <p></p>
      <img src="img/search-icon.png" alt="">
      <img src="img/user-icon.png" alt="">
    </nav>
  </header>
  <section>
    <main class="feed">
      <div class="post">
        <div class="img-text-area">
          <img class="user-img-post" src="img/user-img.png" alt="">
          <textarea class="text-post" rows="4" cols="150" placeholder="What's Happening"></textarea>
        </div>
        <div class="icons-post-btn">
          <img class="post-icon-image" src="img/post-icon-image.png" alt="">
          <button class="post-btn">Post</button>
        </div>
      </div>
      <div class="root-post"> </div>
      <button class="btnLogOut"> Log out</button>
    </main>
  </section> `;
  //TEMPLATE FEED A FEEDCONTAINER (DIV)
  const feedContainer = document.createElement('div');
  feedContainer.innerHTML = templateFeed;

  //BOTON LOGOUT - ONCLICK => SYNC - SIGNOUT (FIREBASE) -> ONNAVIGATE(LOGIN)
  const btnLogOut = feedContainer.querySelector('.btnLogOut');
  btnLogOut.addEventListener('click', () => {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.');
        onNavigate('/');
      })
      .catch((error) => {
        console.log(error, 'An error happened.');
      });
    console.log('btnLogout Clicked');
  });
  //BOTON POST
  const btnPost = feedContainer.querySelector('.post-btn');
  let rootFeed = feedContainer.querySelector('.root-post');
  // const textPost = feedContainer.querySelector('.text-post');
  // const textPost2 = textPost.value;

  //CREATE ARRAY DE POST
  const arrayPost = await getPost();
  const postSorted = arrayPost.sort((x, y) => {
    return y.date - x.date;
  });
  postSorted.forEach((post) => {
    rootFeed.innerHTML += `
    <div class"post-area">
    <div class="interaction-posted">
    <p class="user-name"> ${post.nombrecito} </p>

          <p class="posted-text"> ${post.post} </p>
          <div class="icons-posted">
            <img  src="img/like-icon.png" alt="heart-icon">
            <p class="likes-count">"0"</p>
            <img class="comment-icon"src="img/comment-icon.png" alt="comment-icon">
          </div>
        </div>
        </div>`;
  });

  btnPost.addEventListener('click', async () => {
    // const rootFeed = feedContainer.querySelector('.root-post');
    const textPost = feedContainer.querySelector('.text-post');
    const textPost2 = textPost.value;

    //al darle clic a post, nos traemos esa data y la usamos para llamarla dandole los .id, .mail .nombrecito
    //y si queremos el nombre lo imprimimos en el html
    //no esta bien que sea cada vez que le demos clic al post, debemos buscar una forma de traerlo automaticamente al cargar el feed
    //cuando creemos los post es mejor usar un map que un forEach.
    const userData = await getUserData(auth.currentUser.uid);

    await createData(
      userData.id,
      textPost2,
      userData.mail,
      userData.nombrecito
    );
    rootFeed.innerHTML =
      `
    <div class="interaction-posted">
      <p class="user-name"> ${userData.nombrecito} </p>
            <p class="posted-text"> ${textPost.value} </p>
            <div class="icons-posted">
              <img  src="img/like-icon.png" alt="heart-icon">
              <p class="likes-count">"0"</p>
              <img class="comment-icon"src="img/comment-icon.png" alt="comment-icon">
            </div>

          </div>` + rootFeed.innerHTML;
    console.log('post button clicked');

    textPost.value = '';
  });
  // interaction-posted
  return feedContainer;
};

export default feed;

// import { onNavigate } from "../router/router.js";
// import {auth} from "../firebase/init.js"
// import {signOut } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js'; //sacar de acá!

// const feed = ()=>{
//     const templateFeed = ` <header>
//     <nav>
//       <img src="img/menu-icon.png" alt="">
//       <img class="logo-mediary-nav"src="img/logo-Mediary.png" alt="">
//       <p></p>
//       <img src="img/search-icon.png" alt="">
//       <img src="img/user-icon.png" alt="">
//     </nav>
//   </header>
//   <section>
//     <main class="feed">
//       <div class="post">
//         <div class="img-text-area">
//           <img class="user-img-post" src="img/user-img.png" alt="">
//           <textarea class="text-post" rows="4" cols="150" placeholder="What's Happening"></textarea>
//         </div>
//         <div class="icons-post-btn">
//           <img class="post-icon-image" src="img/post-icon-image.png" alt="">
//           <button class="post-btn">Post</button>
//         </div>
//       </div>
//       <div class="posted">
//         <div class="info-posted">
//           <img class="img-posted" src="img/user-img.png" alt="">
//           <p class="user-name-posted">User Name</p>
//           <img src="img/save-icon.png" alt="">
//           <img src="img/edit-icon.png" alt="">
//         </div>
//       <div class="old-posts">
//         <div class="interaction-posted">
//           <p class="posted-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit.   </p>
//           <div class="icons-posted">
//             <img  src="img/like-icon.png" alt="heart-icon">
//             <p class="likes-count">10</p>
//             <img class="comment-icon"src="img/comment-icon.png" alt="comment-icon">
//           </div>
//         </div>
//        </div>
//       </div>
//       <button class="btnLogOut"> Log out</button>
//     </main>
//   </section> `;
// //TEMPLATE FEED A FEEDCONTAINER (DIV)
//   const feedContainer = document.createElement('div');
//   feedContainer.innerHTML = templateFeed;

// //BOTON LOGOUT - ONCLICK => SYNC - SIGNOUT (FIREBASE) -> ONNAVIGATE(LOGIN)
//   const btnLogOut  = feedContainer.querySelector('.btnLogOut')
//   btnLogOut.addEventListener('click', ()=>{

//     signOut(auth).then(() => {
//       console.log('Sign-out successful.')
//       // onNavigate('/login')
//     }).catch((error) => {
//       console.log(error, 'An error happened.')
//     });
//     console.log('btnLogout Clicked')

//   })
// //BOTON POST
// const btnPost = feedContainer.querySelector('.post-btn');
// const publishedPostContainer = feedContainer.querySelector('.old-posts');
// btnPost.addEventListener('click', ()=>{
//   publishedPostContainer.innerHTML =
//   `<div class="interaction-posted">
//           <p class="posted-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit.   </p>
//           <div class="icons-posted">
//             <img  src="img/like-icon.png" alt="heart-icon">
//             <p class="likes-count">10</p>
//             <img class="comment-icon"src="img/comment-icon.png" alt="comment-icon">
//           </div>
//         </div>`
//   console.log('post button clicked')
// })
// // interaction-posted
//   return feedContainer
//     }

// export default feed
