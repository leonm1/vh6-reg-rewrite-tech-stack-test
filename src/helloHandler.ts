import * as jwt from 'jsonwebtoken';
import * as config from '../assets/config';
import { Request, Response } from 'express';

const helloWorld = (req: Request, res: Response): void => {
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

export default helloWorld;
