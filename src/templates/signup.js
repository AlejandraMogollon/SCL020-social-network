import { onNavigate } from "../router/router.js";

const signUp = () =>{

  const templateSignUp =  `
 <section>
    <main class="main-signup">
      <div class="logo">
        <img src="img/logo-Mediary.png" alt="logo-mediary">
      </div>
      <p class="p-signup-msge"> Create an account to start sharing</p>
      <div class="user-input">
        <input class="email" type="text" value="" placeholder="email ">
        <input class="password" type="text" value="" placeholder="password ">
        <button class="button-signup">Sign Up</button>
        <a href="">Already have an account?</a>
      </div> 
    </main>
  </section> `

   const signUpContainer = document.createElement('div');
   signUpContainer.innerHTML = templateSignUp;
    
  //  const buttonSignUp = signUpContainer.querySelector('.button-signup');
   
  

  return signUpContainer
}

export default signUp 