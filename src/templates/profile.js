import {
  readPost,
  editPost,
  deletePost,
} from '../firebase/firestore.js';
import { onNavigate } from '../router/router.js';
import { auth } from '../firebase/init.js';
import { logOut } from '../firebase/auth.js';
import { findMovies } from '../utility.js';

const profile = async () => {
  const templateUser = ` 
  <header>
    <nav>
      <img class='logo-mediary-nav'src='img/logo-Mediary.png' alt=''>
    </nav>
  </header>
  <section  class='profile-section'>
    <main class='main-profile'> 
      <div class='div-search'>
        <div class= 'container-input-search'>
          <h3>Search Movie:</h3>
          <input type = 'text' class = 'input-search' placeholder='Search Movie Title ...' id = 'movie-search-box'  >
          <div><img class='btnSearch' src='img/search-icon.png' alt=''/></div>
        </div>
      </div> 
      <div class='root-post-profile' id='rootProfile'> </div>
      <aside class= 'user-details'>
      <h1>Profile Information</h1>
        <div class='photo-profile'>
          <img class='user-img-post-profile' src='img/user-photo.png' alt=''>
        </div>  
        <h1 class='user-data-name'></h1>
        <button class='btn-log-out'>            <i class='fa-solid fa-right-from-bracket'></i>
Log out</button>
      </aside>
    </main>
  </section>
  <footer> 
    <p> © 2022 Mediary, Inc. </p>
    <img class='link-logo'src='img/link-logo.png' alt=''>
  </footer> 
   `;
  const userContainer = document.createElement('div');
  userContainer.innerHTML = templateUser;
  const rootProfile = userContainer.querySelector('#rootProfile');
  const asideProfile = userContainer.querySelector('.user-details'); // tomar la clase

  const renderTemplateProfile = (post) => {
    rootProfile.innerHTML = '';
    let postList = '';
    let nickName;
    let email; // crear variable donde si podemos conseguir los datos
    post.forEach(async (doc) => {
      const docData = doc.data;
      const docId = doc.id;
      if (auth.currentUser.uid === docData.user) {
        nickName = docData.nick; // conseguir los datos del nick
        email = docData.mail;
        postList += ` 
        <div class='interaction-posted'>
          <div class='posted-header'>
            <img class='user-photo' src='https://www.eaclinic.co.uk/wp-content/uploads/2019/01/woman-face-eyes-500x500.jpg' alt='user-photo'>
            <p class='user-name'> ${docData.nick}  </p>
            <i class='fa fa-trash' id=${docId} ></i>
            <i class='far fa-edit' id=${docId} ></i>
          </div>
          <p class='post-date' >${docData.date.toDate().toLocaleString()}</p> 
          <textarea  id='text-${docId}'  class='posted-text' disabled='true'> ${docData.post} </textarea>
              <div class='icons-posted'>
              <i class='fa fa-heart' id='like-${docId}'></i>
                <p class='likes-count'>${docData.LikeCount}</p>
                <img class='comment-icon'src='img/comment-icon.png' alt='comment-icon'>
                <button id='cancel-${docId}' class='cancel-edit-btn'>Cancel</button>
                <button id='confirm-${docId}' class='confirm-edit-btn'>Save</button>
              </div>
            </div>`;
      }
    });
    rootProfile.innerHTML = postList;

    // fuera del foreach colocarle el innerHTML de lo que vamos a cambiar, agregandole el nickname
    asideProfile.innerHTML = `<h1>Profile Information</h1>
    <div class='photo-profile'>
      <img class='user-img-post-profile' src='img/user-photo.png' alt=''>
    </div>  
    <h2 class='user-data-name'>${nickName.charAt(0).toUpperCase() + nickName.slice(1, nickName.length)}</h2>
    <div class='line-profile'></div>
    <h3 class='user-data-name'>${email}</h3>
    
    <button class='btn-log-out'><i class='fa-solid fa-right-from-bracket'></i>Log out</button>
    <button class='btn-feed'> Go back to Feed </button>`;
    const btnsEdit = userContainer.querySelectorAll('.fa-edit');

    btnsEdit.forEach((btn) => {
      btn.addEventListener('click', () => {
        btn.classList.add('btnEditActive');
        const textArea = userContainer.querySelector(`#text-${btn.id}`);
        const btnConfirmEdit = userContainer.querySelector(`#confirm-${btn.id}`);
        const btnCancelEdit = userContainer.querySelector(`#cancel-${btn.id}`);
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

    const btnDeleteProfile = userContainer.querySelectorAll('.fa-trash');
    btnDeleteProfile.forEach((btn) => {
      btn.addEventListener('click', async () => {
        const deleteAlert = confirm('Are you sure you want delete this post?');
        if (deleteAlert === true) {
          await deletePost(btn.id);
          readPost(renderTemplateProfile);
        }
      });
    });

    const btnLogOut = userContainer.querySelector('.btn-log-out'); //  funcion boton debajo para que funcionara
    btnLogOut.addEventListener('click', () => {
      logOut(auth);
      onNavigate('/');
    });
    const btnFeed = userContainer.querySelector('.btn-feed');
    btnFeed.addEventListener('click', () => {
      onNavigate('/feed');
    });
  };

  readPost(renderTemplateProfile);

  // ----------------- search ---------------------
  const inputSearch = userContainer.querySelector('.input-search');
  inputSearch.addEventListener('keyup', () => {
    findMovies(inputSearch);
  });

  return userContainer;
};

export default profile;
