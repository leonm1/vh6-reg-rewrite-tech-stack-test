import { Router } from 'service-worker-router';
import { helloWorldCFHandler } from './hello-handler';
import { loginCFHandler } from './login-handler';

// Add 'webworker' to the lib property in your tsconfig.json
// also: https://github.com/Microsoft/TypeScript/issues/14877
declare const self: ServiceWorkerGlobalScope;

// Instantiate a new router
const router = new Router();

// Define routes and their handlers
router.get('/hello', helloWorldCFHandler);
router.post('/login', loginCFHandler);

// Set up service worker event listener
// To resolve 'FetchEvent' add 'webworker' to the lib property in your tsconfig.json
self.addEventListener('fetch', (event: FetchEvent) => {
  // Will test event.request against the defined routes
  // and use event.respondWith(handler) when a route matches
  router.handleEvent(event);
});
