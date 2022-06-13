import { readPost } from "../firebase/firestore.js";
import { onNavigate } from "../router/router.js";
import { auth } from "../firebase/init.js";
import { logOut } from "../firebase/auth.js";
const profile = () => {
  const templateUser = ` 
  <header>
    <nav>
      <img src="img/menu-icon.png" alt="">
      <img class="logo-mediary-nav"src="img/logo-Mediary.png" alt="">
      <img src="img/search-icon.png" alt=""/>
      <img id= "btnUser" src="img/user-icon.png" alt="" >
    </nav>
  </header>
  <section  class="profile-section">
    <main> 
      <div class= "user-details"
        <h1 class="user-name">User Name </h1>
        <ul class="user-name">User Name </ul>
              <button class="btn-log-out"> Log out</button>
              <button class="btn-feed"> Feed </button>
      </div>
      <div id="rootProfile"> </div>
    </main>
  </section>
   `;
  const userContainer = document.createElement("div");
  userContainer.innerHTML = templateUser;
  let rootProfile = userContainer.querySelector("#rootProfile");

  const renderTemplateProfile = (post) => {
    rootProfile.innerHTML = "";
    let postList = "";
    post.forEach(async (doc) => {
      let docData = doc.data;
      let docId = doc.id;
      console.log(docData);
      // console.log(auth.currentUser.uid);
      postList += ` 
      <div class="interaction-posted">
        <div class="posted-header">
          <img class="user-photo" src="https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-500x500.jpg" alt="user-photo">
          <p class="user-name"> ${docData.nick}  </p>
          <img class="delete-icon"src="img/delete-icon.png" id=${docId} alt="delete-icon">
          <i class="far fa-edit" id=${docId} ></i>
        </div>
        <p class="post-date" >${docData.date.toDate().toLocaleString()}</p> 
        <textarea  id="text-${docId}"  class="posted-text" disabled="true"> ${
        docData.post
      } </textarea>
            <div class="icons-posted">
            <i class="fa fa-heart" id="like-${docId}"></i>
              <p class="likes-count">${docData.LikeCount}</p>
              <img class="comment-icon"src="img/comment-icon.png" alt="comment-icon">
              <button id="cancel-${docId}" class="cancel-edit-btn">Cancel</button>
              <button id="confirm-${docId}" class="confirm-edit-btn">Save</button>
            </div>
          </div>`;
    });
    rootProfile.innerHTML = postList;
  };
  // console.log(auth.currentUser.uid);
  readPost(renderTemplateProfile);

  const btnLogOut = userContainer.querySelector(".btn-log-out");
  btnLogOut.addEventListener("click", () => {
    logOut(auth);
    onNavigate("/");
  });
  const btnFeed = userContainer.querySelector(".btn-feed");
  btnFeed.addEventListener("click", () => {
    onNavigate("/feed");
  });
  return userContainer;
};

export default profile;
