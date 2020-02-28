import { NextApiRequest } from 'next';
import cookies from 'next-cookies';
import { IncomingMessage } from 'http';
import { ONE_YEAR } from '../utils/dates';

const TOKEN_COOKIE_NAME = 'th-jwt';

export function getAuthToken(ctx: { req?: NextApiRequest | IncomingMessage }) {
  const allCookies = cookies(ctx || {});
  return allCookies[TOKEN_COOKIE_NAME] || '';
}

export function setAuthToken(token) {
  document.cookie = `${TOKEN_COOKIE_NAME}=${token};Max-Age=${ONE_YEAR / 1000};`;
}

export function clearAuthToken() {
  document.cookie = `${TOKEN_COOKIE_NAME}=;Max-Age=0;`;
}
