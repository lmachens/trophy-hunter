import { Account } from '../types';

export const newAccount: Account = {
  summonerName: 'Trophy Hunter',
  region: 'global',
  trophiesCount: 0,
  islands: {
    hubIsland: {
      status: 'open',
      trophiesCount: 0,
      levels: {
        welcome: {
          status: 'active',
          trophies: {},
        },
      },
    },
  },
};
