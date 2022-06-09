import { onNavigate } from "../router/router.js";
import { auth } from "../firebase/init.js";
import {
  createData,
  deletePost,
  getPost,
  getUserData,
  readPost,
} from "../firebase/firestore.js";
import { logOut } from "../firebase/auth.js";

const feed = async () => {
  const templateFeed = ` 
  <header>
    <nav>
      <img src="img/menu-icon.png" alt="">
      <img class="logo-mediary-nav"src="img/logo-Mediary.png" alt="">
      <button class="btnLogOut"> Log out</button>
      <img src="img/search-icon.png" alt="">
      <img src="img/user-icon.png" alt="">
    </nav>
  </header>
  <section>
    <main class="feed">
      <div class="post">
        <div class="img-text-area">
          <img class="user-img-post" src="https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-500x500.jpg" alt="">
          <textarea class="text-post" rows="4" cols="150" placeholder="What's Happening"></textarea>
        </div>
        <div class="icons-post-btn">
          <img class="post-icon-image" src="img/post-icon-image.png" alt="">
          <button class="post-btn">Post</button>
        </div>
      </div>
      <div class="root-post"> </div>
    </main>
  </section> `;
  //TEMPLATE FEED A FEEDCONTAINER (DIV)
  const feedContainer = document.createElement("div");
  feedContainer.innerHTML = templateFeed;

  //BOTON LOGOUT - ONCLICK => SYNC - SIGNOUT (FIREBASE) -> ONNAVIGATE(LOGIN)
  const btnLogOut = feedContainer.querySelector(".btnLogOut");
  btnLogOut.addEventListener("click", async () => {
    await logOut(auth);
    onNavigate("/");
  });

  //BOTON POST
  const btnPost = feedContainer.querySelector(".post-btn");
  let rootFeed = feedContainer.querySelector(".root-post");
  // const textPost = feedContainer.querySelector('.text-post');
  // const textPost2 = textPost.value;

  const renderTemplateFeed = (post) => {
    // console.log(post);
    rootFeed.innerHTML = "";
    let postList = "";
    post.forEach(async (doc) => {
      let docData = doc.data;
      let docId = doc.id;
      console.log(docData);
      // console.log(doc.data());
      postList += `
      <div class="interaction-posted">
        <div class="posted-header">
          <img class="user-photo" src="https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-500x500.jpg" alt="user-photo">
          <p class="user-name"> ${docData.nick}  </p>
          <img class="delete-icon"src="img/delete-icon.png" id=${docId} alt="delete-icon">
          <img class="edit-icon"src="img/edit-icon.png" alt="edit-icon">
        </div>
        <p class="post-date" >${docData.date.toDate().toLocaleString()}</p> 
        <textarea  class="posted-text" disabled=true> ${
          docData.post
        } </textarea >
            <div class="icons-posted">
              <img class="heart-icon" src="img/like-icon.png" alt="heart-icon">
              <p class="likes-count">0</p>
              <img class="comment-icon"src="img/comment-icon.png" alt="comment-icon">
            </div>
          </div>`;
      // console.log(doc.data());
    });
    rootFeed.innerHTML = postList;
    const btnDelete = feedContainer.querySelectorAll(".delete-icon");
    btnDelete.forEach((btn) => {
      console.log("hola");
      btn.addEventListener("click", async (e) => {
        console.log(btn.id);
        // let id = e.target.id;
        // const deleteAlert = confirm("Are you sure you want delete this post?");
        // if (deleteAlert === true) {
        await deletePost(btn.id);
        readPost(renderTemplateFeed);
        //   window.location.reload();
        // } else {
        //   alert("Your post was not eliminated!!");
        // }
      });
    });
  };

  readPost(renderTemplateFeed);
  btnPost.addEventListener("click", async () => {
    // const rootFeed = feedContainer.querySelector('.root-post');
    const textPost = feedContainer.querySelector(".text-post");
    const textPost2 = textPost.value;

    const userData = await getUserData(auth.currentUser.uid);
    const postId = await createData(
      userData.id,
      textPost2,
      userData.mail,
      userData.nick
    );

    console.log(postId);
    const subRoot = document.createElement("div");
    subRoot.className = "interaction-posted";
    // subRoot.innerHTML = await templateCreatedLastPost(
    //   userData.nick,
    //   postId,
    //   textPost.value
    // );
    const firstPost = rootFeed.querySelector(".interaction-posted");
    // rootFeed.insertBefore(subRoot, firstPost);

    // console.log("post button clicked", postId);
    textPost.value = "";

    const btnEdit = feedContainer.querySelectorAll(".edit-icon");
    btnEdit.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log("edit-icon clicked");
      });
    });
    const btnLike = feedContainer.querySelectorAll(".heart-icon");
    btnLike.forEach((btn) => {
      btn.addEventListener("click", function () {
        console.log(this);
        this.src = "img/liked-icon.png";
      });
    });

    const btnComment = feedContainer.querySelectorAll(".comment-icon");
    btnComment.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log("comment-icon clicked");
      });
    });
  });

  return feedContainer;
};

export default feed;

//al darle clic a post, nos traemos esa data y la usamos para llamarla dandole los .id, .mail .nick
//y si queremos el nombre lo imprimimos en el html
//no esta bien que sea cada vez que le demos clic al post, debemos buscar una forma de traerlo automaticamente al cargar el feed
//cuando creemos los post es mejor usar un map que un forEach.

//CREATE ARRAY DE POST

// const arrayPost = await getPost(); FUNCIONANDO
// const arrayPost = await getPost();
// const readPost = arrayPost.sort((x, y) => {
//   return y.date - x.date;
// });

// const postSorted = arrayPost.sort((x, y) => { //FUNCIONANDO
//   return y.date - x.date;
// });

// if (postSorted.length > 0) {
//   postSorted.forEach((post) => {
//     rootFeed.innerHTML += `
//     <div class="interaction-posted">
//       <div class="posted-header">
//         <img class="user-photo" src="https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-500x500.jpg" alt="user-photo">
//         <p class="user-name"> ${post.nick} </p>
//         <img class="delete-icon"src="img/delete-icon.png" id=${post.id} alt="delete-icon">
//         <img class="edit-icon"src="img/edit-icon.png" alt="edit-icon">
//       </div>
//       <p class="posted-text"> ${post.post} </p>
//           <div class="icons-posted">
//             <img class="heart-icon" src="img/like-icon.png" alt="heart-icon">
//             <p class="likes-count">0</p>
//             <img class="comment-icon"src="img/comment-icon.png" alt="comment-icon">
//           </div>
//         </div>`;
//   });
// }  FUNCIONANDO
