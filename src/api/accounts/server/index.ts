import { Account } from '../types';

export const newAccount: Account = {
  summoner: {
    platformId: 'global',
    accountId: '',
    revisionDate: 0,
    name: 'Trophy Hunter',
    id: '',
    puuid: '',
    summonerLevel: 0,
  },
  authTokens: [],
  islands: [
    {
      name: 'hub',
      status: 'open',
    },
  ],
  levels: [
    {
      name: 'welcome',
      island: 'hub',
      status: 'active',
      unlockedAt: Date.now(),
    },
  ],
  trophies: [],
  games: 0,
  lastGameIds: [],
  favoriteTrophyNames: [],
  trophiesCompleted: 0,
};
