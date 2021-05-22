import { Account, Credential, Ranking, SeasonAccount } from './types';
import { postJSON, getJSON, patchJSON } from '../utils/request';
import { log } from '../logs';
import { trackCheck } from '../performance';
export * from './types';

export const postLogin = (credential: Credential) => {
  return postJSON<Account>('/api/login', credential);
};

export const getAccount = () => {
  return getJSON<Account>('/api/account');
};

export const getPublicAccount = ({ summonerName, platformId }: Credential) => {
  return getJSON<Account>(
    `/api/public-account?summonerName=${summonerName}&platformId=${platformId}`
  );
};

export const postCheck = (matchId: number) => {
  log(`postCheck ${matchId}`);
  trackCheck(matchId);
  return postJSON<{
    trophyNames: string[];
    unlockedIslandNames: string[];
    missionTrophyNames: string[];
  }>('/api/check', { matchId });
};

export const getRankings = (season?: string) => {
  return getJSON<Ranking[]>(
    `/api/rankings${season ? `?season=${season}` : ''}`
  );
};

export const getSeasonAccount = (season: string) => {
  return getJSON<SeasonAccount>(`/api/season-account?season=${season}`);
};
