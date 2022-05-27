import { onNavigate } from "../router/router.js";
import signUp from '../templates/signup.js'
const login = ()=>{
    const templateLogin = `
        <section>
            <main class="home">
            <div class="logo">
                <img src="img/logo-Mediary.png" alt="logo-mediary">
            </div>
            <p class="welcome"> Mediary your space to share about books and its movie adaptations</p>
            <div class="user-input">
                <input class="email" type="text" value="" placeholder="email ">
                <input class="password" type="text" value="" placeholder="password ">
                <button id="login" class="log-in">Log In</button>
                <a href="">Forgot Password?</a>
            </div>
            <img src="https://source.unsplash.com/random/500x400" width="80px"alt="Random Image">
            <div class="separation-div"> --- o --- </div>
            <button id="botonRegistro" class="sign-in"> <img src="img/logo-Google.png" alt="logo-Google">  Google</button>
            <div class="registration">
                <p> Don't have an account?  <button class="btnSignUp" id="btnSignUp"  >Sign Up here</button></p>
            </div>      
            </main>
        </section> `

    const loginContainer = document.createElement('div');
    loginContainer.innerHTML = templateLogin;
    const login = loginContainer.querySelector('.log-in');
    login.addEventListener('click',()=>{
        onNavigate('/feed')
        console.log('click login')
    })

  
    return loginContainer
    }

export default login