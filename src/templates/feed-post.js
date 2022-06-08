import { deletePost } from "../firebase/firestore.js";
export const templateCreatedLastPost = async (nick, postId, textPost) => {
  const lastPost = `
  <div class="posted-header"> 
      <img class="user-photo" src="https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-500x500.jpg" alt="user-photo">
      <p class="user-name"> ${nick} </p>
      <img class="delete-icon"src="img/delete-icon.png" id=${postId} alt="delete-icon">
      <img class="edit-icon"src="img/edit-icon.png" alt="edit-icon">
    </div>
    <p class="posted-text"> ${textPost} </p>
      <div class="icons-posted">
        <img class="heart-icon" src="img/like-icon.png" alt="heart-icon">
        <p class="likes-count">0</p>
        <img class="comment-icon"src="img/comment-icon.png" alt="comment-icon">
      </div>`;

  const postHeader = document.querySelector(".posted-header");
  const btnDelete = postHeader.querySelector(".delete-icon");

  btnDelete.addEventListener("click", () => {
    console.log("clicked delete primer post");
    // let id = e.target.id;
    // const deleteAlert = confirm("Are you sure you want delete this post?");
    // if (deleteAlert === true) {
    //   await deletePost(id);
    //   window.location.reload();
    // } else {
    //   alert("Your post was not eliminated!!");
    // }
  });

  return lastPost;
};
