import * as jwt from 'jsonwebtoken';
import * as config from '../assets/config';
import * as e from 'express';
import { HandlerContext } from 'service-worker-router';
import { Response } from 'node-fetch';

export const helloWorldExHandler = (req: e.Request, res: e.Response): void => {
  let token: any;
  try {
    const authHeader = req.get(config.AUTH_HEADER_NAME) || '';
    const reqToken = authHeader.replace(config.AUTH_HEADER_PREFIX, '');
    token = jwt.verify(reqToken, config.JWT_SIGNATURE, {
      issuer: config.JWT_ISSUER_STR,
      maxAge: config.JWT_TOKEN_MAXAGE,
    });
  } catch (err) {
    // jwt.verify throws on invalid token
    res.status(403).send(err);
    return;
  }

  res
    .status(200)
    .send(`${config.GREETING} ${token[config.JWT_USERNAME_FIELD] as string}`);
};

export const helloWorldCFHandler = async ({
  request,
}: HandlerContext): Promise<Response> => {
  // Check request (thanks typescript)
  if (request == undefined) {
    return new Response('bad request', { status: 400 });
  }

  // Verify token
  let token: any;
  try {
    const authHeader = request.headers.get(config.AUTH_HEADER_NAME) || '';
    const reqToken = authHeader.replace(config.AUTH_HEADER_PREFIX, '');
    token = jwt.verify(reqToken, config.JWT_SIGNATURE, {
      issuer: config.JWT_ISSUER_STR,
      maxAge: config.JWT_TOKEN_MAXAGE,
    });
  } catch (err) {
    // jwt.verify throws on invalid token
    return new Response(err, { status: 403 });
  }

  // Say hello!
  return new Response(
    `${config.GREETING} ${token[config.JWT_USERNAME_FIELD] as string}`,
    { status: 200 }
  );
};
