import { readPost, getUserData,editPost } from '../firebase/firestore.js';
import { onNavigate } from '../router/router.js';
import { auth } from '../firebase/init.js';
import { logOut } from '../firebase/auth.js';
import { findMovies} from '../utility.js';
const search = async () => {
  const templateSearch = ` 
    <header>
        <nav>
            <img class="logo-mediary-nav"src="img/logo-Mediary.png" alt="">
        </nav>
    </header>
    <div class="div-search" display="block">
        <div class= "container-input-search">
          <h3>Search Movie:</h3>
          <input type = "text" class = "input-search" placeholder="Search Movie Title ..." id = "movie-search-box"  >
          <div><img class="btnSearch" src="img/search-icon.png" alt=""/></div>
        </div>
      </div> 
    <footer> 
        <p> © 2022 Mediary, Inc. </p>
        <img class="link-logo"src="img/link-logo.png" alt="">
    </footer> 
   `;
  const searchContainer = document.createElement('div');
  searchContainer.innerHTML = templateSearch;

  //----------------- search ---------------------//

  const inputSearch = searchContainer.querySelector('.input-search');
  inputSearch.addEventListener('keyup', () => {
    findMovies(inputSearch);
  });

  return searchContainer;
};

export default search;