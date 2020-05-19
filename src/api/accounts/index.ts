import { Account, Credential } from './types';
import { postJSON, getJSON } from '../utils/request';
export * from './types';

export const postLogin = (credential: Credential) => {
  return postJSON<Account>('/api/login', credential);
};

export const getAccount = () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#Examples
  // Check if `account` cookie exists
  if (
    document.cookie
      .split(';')
      .some(item => item.trim().startsWith('authToken='))
  ) {
    return getJSON<Account>('/api/account');
  }
};
