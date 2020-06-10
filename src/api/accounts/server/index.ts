import { Account } from '../types';

export const newAccount: Account = {
  summoner: {
    platformId: 'global',
    accountId: '',
    profileIconId: 0,
    revisionDate: 0,
    name: 'Trophy Hunter',
    id: '',
    puuid: '',
    summonerLevel: 0,
  },
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
};
