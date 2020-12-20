import { Account, Credential, Ranking } from './types';
import { postJSON, getJSON, patchJSON } from '../utils/request';
import { log } from '../logs';
export * from './types';

export const postLogin = (credential: Credential) => {
  return postJSON<Account>('/api/login', credential);
};

export const getAccount = () => {
  return getJSON<Account>('/api/account');
};

export const postCheck = (matchId: number) => {
  log(`postCheck ${matchId}`);
  return postJSON<{
    trophyNames: string[];
    unlockedIslandNames: string[];
  }>('/api/check', { matchId });
};

export const patchAccount = (patch) => {
  return patchJSON<Account>('/api/account', patch);
};

export const getRankings = () => {
  return getJSON<Ranking[]>('/api/rankings');
};
