import login from '../templates/login.js';
import feed from '../templates/feed.js';
import signUp from '../templates/signup.js';

const routes = {
  // path: '/'
  // template:home()
  '/': login(),
  '/feed': await feed(),
  '/signup': signUp(),
};

const onNavigate = (pathname) => {
  let rootDiv = document.getElementById('root');

  window.history.pushState({}, pathname, window.location.origin + pathname);
  rootDiv.innerHTML = null;
  rootDiv.appendChild(routes[pathname]);
};

export { onNavigate };
