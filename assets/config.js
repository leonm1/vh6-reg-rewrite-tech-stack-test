"use strict";
exports.__esModule = true;
require('dotenv').config();
// String to print for /hello/* endpoints
exports.GREETING = 'Hello';
// JWT config
exports.JWT_TOKEN_MAXAGE = '2 days';
exports.JWT_USERNAME_FIELD = 'usr';
exports.AUTH_HEADER_NAME = 'Authorization';
exports.AUTH_HEADER_PREFIX = 'Bearer ';
// Secured variables only input at runtime
exports.JWT_SIGNATURE = process.env['JWT_SIGNATURE'];
exports.JWT_ISSUER_STR = ('urn =' +
    process.env['JWT_ISSUER_STR']);
exports.JWT_TEST_USR = process.env['JWT_TEST_USR'];
exports.JWT_TEST_PW = process.env['JWT_TEST_PW'];
// Express config
exports.PORT = 3000;
