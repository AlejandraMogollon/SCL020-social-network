/* eslint-disable */
import { onNavigate } from '../router/router.js';
import { auth } from '../firebase/init.js';
import {
  createData,
  deletePost,
  getUserData,
  readPost,
  editPost,
  likeStatus,
} from '../firebase/firestore.js';

const feed = async () => {
  const templateFeed = ` 
  <header>
    <nav>
      <img src='img/menu-icon.png' alt=''>
      <img class='logo-mediary-nav'src='img/logo-Mediary.png' alt=''>
      <img id='btnSearch' src='img/search-icon.png' alt=''/>
      <img id='btnUser' class='btnUser' src='img/user-icon.png' alt='' >
    </nav>
  </header>
  <section class='section-feed'>
  <div class='div1'> 
  <p class='best'> Book </p>
    <div class='pic-ctn'>
    <img src='img/Heartstopper.jpg' alt='' class='pic'>
    <img src='img/DeathOnTheNile.jpg' alt='' class='pic'>
    <img src='img/Dune.jpg' alt='' class='pic'>
    <img src='img/FrenchExit.png' alt='' class='pic'>
    <img src='img/TheBoys.jpg' alt='' class='pic'>
  </div>
   </div>
    <main class='feed'>
      <div class='post'>
        <div class='img-text-area'>
          <img class='user-img-post' src='https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-500x500.jpg' alt=''>
          <textarea class='text-post' rows='4' cols='150' placeholder="What's Happening" ></textarea>
        </div>
        <div class='icons-post-btn'>
          <img class='post-icon-image' src='img/post-icon-image.png' alt=''>
          <button class='post-btn'>Post</button>
        </div>
      </div>
      <div class='root-post'> </div>
    </main>
    <div class='div1'> 
  <p class='best'> Adaptation </p>
    <div class='pic-ctn'>
    <img src='img/HeartstopperAd.jpg' alt='' class='pic'>
    <img src='img/DeathOnTheNileAd.jpg' alt='' class='pic'>
    <img src='img/DuneAd.jpg' alt='' class='pic'>
    <img src='img/FrenchExitAd.png' alt='' class='pic'>
    <img src='img/TheBoysAd.jpg' alt='' class='pic'>
  </div>
   </div>
  </section>
  <footer> 
  <p> © 2022 Mediary, Inc. </p>
  <img class='link-logo'src='img/link-logo.png' alt=''>
  
  </footer> `;
  // TEMPLATE FEED A FEEDCONTAINER (DIV)
  const feedContainer = document.createElement('div');
  feedContainer.className = 'feed-container';
  feedContainer.innerHTML = templateFeed;

  const btnUser = feedContainer.querySelector('.btnUser');
  btnUser.addEventListener('click', () => {
    // const userNameProfile = auth.currentUser.uid;
    onNavigate('/profile');
  });
  const btnSearch = feedContainer.querySelector('#btnSearch');
  btnSearch.addEventListener('click', () => {
    onNavigate('/search');
  });
  // BOTON POST
  const btnPost = feedContainer.querySelector('.post-btn');
  const rootFeed = feedContainer.querySelector('.root-post');
  const renderTemplateFeed = (post) => {
    if (!auth.currentUser) return;
    rootFeed.innerHTML = '';
    let postList = '';
    post.forEach(async (doc) => {
      const docData = doc.data;
      const docId = doc.id;
      let likeHtml = `<i class='fa fa-heart' id=${docId}></i>`;
      if (docData.UsersWhoLiked.includes(auth.currentUser.uid)) {
        likeHtml = `<i class='fa fa-heart like' id=${docId}></i>`;
      }
      postList += ` 
      <div class='interaction-posted'>
        <div class='posted-header'>
          <img class='user-photo' src='https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-500x500.jpg' alt='user-photo'>
          <p class='user-name'> ${docData.nick}  </p>
          <p></p>
          ${
            docData.user === auth.currentUser.uid
              ? `<i class='fa fa-trash' id=${docId} ></i> <i class='fas fa-edit' id=${docId} ></i>`
              : ''
          }
        </div>
        <p class='post-date' >${docData.date.toDate().toLocaleString()}</p> 
        <textarea  id='text-${docId}'  class='posted-text' disabled='true'> ${
        docData.post
      } </textarea>
            <div class='icons-posted'>
            ${likeHtml}
              <p class='likes-count'>${docData.LikeCount}</p>
              <img class='comment-icon'src='img/comment-icon.png' alt='comment-icon'>
              <button id='cancel-${docId}' class='cancel-edit-btn'>Cancel</button>
              <button id='confirm-${docId}' class='confirm-edit-btn'>Save</button>
            </div>
          </div>`;
    });
    rootFeed.innerHTML = postList;
    const btnsEdit = feedContainer.querySelectorAll('.fa-edit');

    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.add('btnEditActive');
        const textArea = feedContainer.querySelector(`#text-${btn.id}`);
        const btnConfirmEdit = feedContainer.querySelector(
          `#confirm-${btn.id}`
        );
        const btnCancelEdit = feedContainer.querySelector(`#cancel-${btn.id}`);
        textArea.disabled = false;
        textArea.style.border = '2px solid white';
        btnCancelEdit.classList.add('visible');
        btnConfirmEdit.classList.add('visible');
        btnCancelEdit.addEventListener('click', () => {
          textArea.disabled = true;
          textArea.style.border = 'none';
          btn.classList.remove('btnEditActive');
          btnCancelEdit.classList.remove('visible');
          btnConfirmEdit.classList.remove('visible');
        });
        btnConfirmEdit.addEventListener('click', async () => {
          await editPost(btn.id, textArea.value);
        });
      });
    });
    // Button Like
    const btnLike = feedContainer.querySelectorAll('.fa-heart');
    btnLike.forEach((buttonLike) => {
      buttonLike.addEventListener('click', async (e) => {
        const idPostLike = e.target.id;
        await likeStatus(idPostLike, auth.currentUser.uid);
      });
    });
    const btnDelete = feedContainer.querySelectorAll('.fa-trash');
    btnDelete.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const deleteAlert = confirm('Are you sure you want delete this post?');
        if (deleteAlert === true) {
          await deletePost(btn.id);
          readPost(renderTemplateFeed);
        }
      });
    });
  };

  readPost(renderTemplateFeed);

  btnPost.addEventListener('click', async () => {
    const textPost = feedContainer.querySelector('.text-post');
    const userData = await getUserData(auth.currentUser.uid);
    if (textPost.value !== '') {
      await createData(
        userData.id,
        textPost.value,
        userData.mail,
        userData.nick
      );
      const subRoot = document.createElement('div');
      subRoot.className = 'interaction-posted';
      textPost.value = '';
    } else {
      alert('You need a message');
    }

    const btnComment = feedContainer.querySelectorAll('.comment-icon');
    btnComment.forEach((btn) => {
      btn.addEventListener('click', () => {});
    });
  });
  return feedContainer;
};
export default feed;
