import * as jwt from 'jsonwebtoken';
import * as config from '../assets/config';
import { HandlerContext } from 'service-worker-router';
import { Response } from 'node-fetch';

export const loginCFHandler = async ({
  request,
}: HandlerContext): Promise<Response> => {
  // Check request (thanks typescript)
  if (request == undefined) {
    return new Response('bad request', { status: 400 });
  }

  // Check username/password
  const usr = request.headers.get('username') || '';
  if (
    usr !== config.JWT_TEST_USR ||
    request.headers.get('password') !== config.JWT_TEST_PW
  ) {
    return new Response('invalid username/password', { status: 403 });
  }

  // Issue JWT
  let token = jwt.sign(
    { usr: usr, iat: Math.floor(Date.now() / 1000) - 30 },
    config.JWT_SIGNATURE,
    { expiresIn: config.JWT_TOKEN_MAXAGE, issuer: config.JWT_ISSUER_STR }
  );

  // Send the jwt!
  return new Response(token);
};
