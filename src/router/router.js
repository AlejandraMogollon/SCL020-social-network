import login from "../templates/login.js";
import feed from "../templates/feed.js";
import signUp from "../templates/signup.js";
import profile from "../templates/profile.js";
import search from "../templates/search.js";


const routes = {
  // path: '/'
  // template:home()
  "/": login(),
  "/feed": await feed(),
  "/signup": signUp(),
  "/profile": profile(),
   "/search" :search()
};

const onNavigate = (pathname) => {
  let rootDiv = document.getElementById("root");

  window.history.pushState(null, null, window.location.origin + pathname);
  rootDiv.innerHTML = null;
  rootDiv.appendChild(routes[pathname]);
};

export { onNavigate };
