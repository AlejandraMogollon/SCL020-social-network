/* eslint-disable */
import login from '../templates/login.js';
import feed from '../templates/feed.js';
import signUp from '../templates/signup.js';
import profile from '../templates/profile.js';

const routes = {
  '/': login,
  '/feed':  feed,
  '/signup': signUp,
  '/profile':  profile,
  // '/search':  search,
  
};

const onNavigate = async (pathname) => {
  let rootDiv = document.getElementById('root');

  window.history.pushState(null, null, window.location.origin + pathname);
  rootDiv.innerHTML = null;
  const routeFunction = await routes[pathname]()
  rootDiv.appendChild(routeFunction);
};

export { onNavigate };
