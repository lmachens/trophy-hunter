import { Account, Credential } from './types';
import { postJSON, getJSON, patchJSON } from '../utils/request';
export * from './types';

export const postLogin = (credential: Credential) => {
  return postJSON<Account>('/api/login', credential);
};

export const postReset = () => {
  return postJSON<Account>('/api/reset', {});
};

export const getAccount = () => {
  return getJSON<Account>('/api/account');
};

export const postCheck = (matchId: number) => {
  return postJSON<{
    trophyNames: string[];
  }>('/api/check', { matchId });
};

export const patchAccount = (patch) => {
  return patchJSON<Account>('/api/account', patch);
};
