import { template } from '@babel/core';

const paths = {
  home: {
    path: '/',
    template: `
        <section>
        <main class="home">
        <div class="logo">
            <img src="img/logo-Mediary.png" alt="logo-mediary">
        </div>
        <p class="welcome"> Mediary your space to share about books and its movie adaptations</p>
        <div class="user-input">
            <input class="email" type="text" value="" placeholder="email ">
            <input class="password" type="text" value="" placeholder="password ">
            <button class="log-in" onclick="router.load('feed')">Log In</button>
            <a href="">Forgot Password?</a>
        </div>
        <div class="separation-div"> --- o --- </div>
        <button class="sign-in"> <img src="img/logo-Google.png" alt="logo-Google">  Google</button>
        <div class="registration">
            <p class=""> Don't have an account?  <a href="" onclick="router.load('signup')">Sign Up here</a></p>
        </div>
        </main>
        </section>
        `,
  },
  signup: {
    path: '/signup',
    template: `
        <section>
            <main class="signup">
            <div class="logo">
                <img src="img/logo-Mediary.png" alt="logo-mediary">
            </div>
            <p class="p-signup-msge"> Create an account to start sharing</p>
            <div class="user-input">
                <input class="email" type="text" value="" placeholder="email ">
                <input class="password" type="text" value="" placeholder="password ">
                <button class="log-in">Sign Up</button>
                <a href="">Already have an account?</a>
            </div>
            </main>
        </section>
        `,
  },
  feed: {
    path: '/feed',
    template: `
        <header>
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
        <div class="posted">
        <div class="info-posted">
          <img class="img-posted" src="img/user-img.png" alt="">
          <p class="user-name-posted">User Name</p>
          <img src="img/save-icon.png" alt="">
          <img src="img/edit-icon.png" alt="">
        </div>
        <div class="interaction-posted">
          <p class="posted-text"> Lorem ipsum dolor sit amet consectetur adipisicing elit.   </p>
          <div class="icons-posted">
            <img  src="img/like-icon.png" alt="heart-icon">
            <p class="likes-count">10</p>
            <img class="comment-icon"src="img/comment-icon.png" alt="comment-icon">
          </div>
        </div>
        </div>
        </main>
        </section>
        `,
  },
};

export { paths };
