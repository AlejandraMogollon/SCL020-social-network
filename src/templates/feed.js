import { onNavigate } from "../router/router.js";
import { auth } from "../firebase/init.js";
import {
  createData,
  deletePost,
  getPost,
  getUserData,
} from "../firebase/firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js"; //sacar de acá!

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
  btnLogOut.addEventListener("click", () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        onNavigate("/");
      })
      .catch((error) => {
        console.log(error, "An error happened.");
      });
    console.log("btnLogout Clicked");
  });
  //BOTON POST
  const btnPost = feedContainer.querySelector(".post-btn");
  let rootFeed = feedContainer.querySelector(".root-post");
  // const textPost = feedContainer.querySelector('.text-post');
  // const textPost2 = textPost.value;

  //CREATE ARRAY DE POST
  const arrayPost = await getPost();
  const postSorted = arrayPost.sort((x, y) => {
    return y.date - x.date;
  });

  if (postSorted.length > 0) {
    postSorted.forEach((post) => {
      rootFeed.innerHTML += `
      <div class="interaction-posted">
        <div class="posted-header">
          <img class="user-photo" src="https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-500x500.jpg" alt="user-photo">
          <p class="user-name"> ${post.nick} </p>
          <img class="delete-icon"src="img/delete-icon.png" id=${post.id} alt="delete-icon">
          <img class="edit-icon"src="img/edit-icon.png" alt="edit-icon">
        </div>
        <p class="posted-text"> ${post.post} </p>
            <div class="icons-posted">
              <img class="heart-icon" src="img/like-icon.png" alt="heart-icon">
              <p class="likes-count">0</p>
              <img class="comment-icon"src="img/comment-icon.png" alt="comment-icon">
            </div>
          </div>`;
    });
  }

  btnPost.addEventListener("click", async () => {
    // const rootFeed = feedContainer.querySelector('.root-post');
    const textPost = feedContainer.querySelector(".text-post");
    const textPost2 = textPost.value;
    //al darle clic a post, nos traemos esa data y la usamos para llamarla dandole los .id, .mail .nick
    //y si queremos el nombre lo imprimimos en el html
    //no esta bien que sea cada vez que le demos clic al post, debemos buscar una forma de traerlo automaticamente al cargar el feed
    //cuando creemos los post es mejor usar un map que un forEach.
    const userData = await getUserData(auth.currentUser.uid);
    const postId = await createData(
      userData.id,
      textPost2,
      userData.mail,
      userData.nick
    );
    const subRoot = document.createElement("div");
    subRoot.className = "interaction-posted";
    subRoot.innerHTML = `<div class="posted-header"> 
      <img class="user-photo" src="https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-500x500.jpg" alt="user-photo">
      <p class="user-name"> ${userData.nick} </p>
      <img class="delete-icon"src="img/delete-icon.png" id=${postId} alt="delete-icon">
      <img class="edit-icon"src="img/edit-icon.png" alt="edit-icon">
    </div>
    <p class="posted-text"> ${textPost.value} </p>
      <div class="icons-posted">
        <img class="heart-icon" src="img/like-icon.png" alt="heart-icon">
        <p class="likes-count">0</p>
        <img class="comment-icon"src="img/comment-icon.png" alt="comment-icon">
      </div>`;
    const firstPost = rootFeed.querySelector(".interaction-posted");
    rootFeed.insertBefore(subRoot, firstPost);
    // rootFeed.innerHTML = subRoot.innerHTML + rootFeed.innerHTML;
    //append child

    console.log("post button clicked", postId);
    textPost.value = "";
    // window.location.reload();

    const btnEdit = feedContainer.querySelectorAll(".edit-icon");
    btnEdit.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log("edit-icon clicked");
      });
    });
    const btnLike = feedContainer.querySelectorAll(".heart-icon");
    btnLike.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log("like-icon clicked");
      });
    });

    const btnComment = feedContainer.querySelectorAll(".comment-icon");
    btnComment.forEach((btn) => {
      btn.addEventListener("click", () => {
        console.log("comment-icon clicked");
      });
    });
  });

  const btnDelete = feedContainer.querySelectorAll(".delete-icon");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      let id = e.target.id;
      const deleteAlert = confirm("Are you sure you want delete this post?");
      if (deleteAlert === true) {
        await deletePost(id);
        window.location.reload();
      } else {
        alert("Your post was not eliminated!!");
      }
    });
  });

  return feedContainer;
};

export default feed;
