require('dotenv').config();

// String to print for /hello/* endpoints
export const GREETING = 'Hello' as string;

// JWT config
export const JWT_TOKEN_MAXAGE = '2 days' as string;
export const JWT_USERNAME_FIELD = 'usr' as string;
export const AUTH_HEADER_NAME = 'Authorization' as string;
export const AUTH_HEADER_PREFIX = 'Bearer ' as string;

// Secured variables only input at runtime
export const JWT_SIGNATURE = process.env['JWT_SIGNATURE'] as string;
export const JWT_ISSUER_STR = ('urn =' +
  process.env['JWT_ISSUER_STR']) as string;
export const JWT_TEST_USR = process.env['JWT_TEST_USR'] as string;
export const JWT_TEST_PW = process.env['JWT_TEST_PW'] as string;
