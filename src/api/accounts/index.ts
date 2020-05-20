import { Account, Credential } from './types';
import { postJSON, getJSON } from '../utils/request';
export * from './types';

export const postLogin = (credential: Credential) => {
  return postJSON<Account>('/api/login', credential);
};

export const getAccount = () => {
  return getJSON<Account>('/api/account');
};

export const postUnlock = (levelName: string) => {
  return postJSON<Account>('/api/check', { levelName });
};
