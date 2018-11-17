require('dotenv').config();
// String to print for /hello/* endpoints
export const GREETING = 'Hello';
// JWT config
export const JWT_TOKEN_MAXAGE = '2 days';
export const JWT_USERNAME_FIELD = 'usr';
export const AUTH_HEADER_NAME = 'Authorization';
export const AUTH_HEADER_PREFIX = 'Bearer ';
// Secured variables only input at runtime
export const JWT_SIGNATURE = process.env['JWT_SIGNATURE'];
export const JWT_ISSUER_STR = ('urn =' +
    process.env['JWT_ISSUER_STR']);
export const JWT_TEST_USR = process.env['JWT_TEST_USR'];
export const JWT_TEST_PW = process.env['JWT_TEST_PW'];
