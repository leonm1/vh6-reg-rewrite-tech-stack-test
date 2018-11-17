import * as jwt from 'jsonwebtoken';
import { Router } from 'service-worker-router';
import * as config from './assets/config';
const login = async (request) => {
    const usr = request.headers.get('username');
    if (usr !== config.JWT_TEST_USR ||
        request.headers.get('password') !== config.JWT_TEST_PW) {
        return new Response('invalid username/password', { status: 403 });
    }
    let token = jwt.sign({ usr: usr, iat: Math.floor(Date.now() / 1000) - 30 }, config.JWT_SIGNATURE, { expiresIn: config.JWT_TOKEN_MAXAGE, issuer: config.JWT_ISSUER_STR });
    return new Response(token);
};
const helloWorld = async (request) => {
    let token;
    try {
        token = jwt.verify(request.headers
            .get(config.AUTH_HEADER_NAME)
            .replace(config.AUTH_HEADER_PREFIX, ''), config.JWT_SIGNATURE, { issuer: config.JWT_ISSUER_STR, maxAge: config.JWT_TOKEN_MAXAGE });
    }
    catch (err) {
        // jwt.verify throws on invalid token
        return new Response(err, { status: 403 });
    }
    return new Response(`${config.GREETING} ${token[config.JWT_USERNAME_FIELD]}`);
};
// Define routes and their handlers
const router = new Router();
router.post('/login', login);
router.get('/hello/*', helloWorld);
addEventListener('fetch', (e) => {
    const fe = e;
    router.handleEvent(fe);
});
