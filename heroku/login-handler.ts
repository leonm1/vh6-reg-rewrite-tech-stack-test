import * as jwt from 'jsonwebtoken';
import * as config from '../assets/config';
import * as ex from 'express';

export const loginExHandler = (req: ex.Request, res: ex.Response): void => {
  const usr = req.get('username') || '';
  if (
    usr !== config.JWT_TEST_USR ||
    req.get('password') !== config.JWT_TEST_PW
  ) {
    res.status(403).send('invalid username/password');
    return;
  }

  let token = jwt.sign(
    { usr: usr, iat: Math.floor(Date.now() / 1000) - 30 },
    config.JWT_SIGNATURE,
    { expiresIn: config.JWT_TOKEN_MAXAGE, issuer: config.JWT_ISSUER_STR }
  );

  res.status(200).send(token);
  return;
};
