import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js';

import config from './config.js';

// Initialize Firebase
const app = initializeApp(config);

export { initializeApp, app };
