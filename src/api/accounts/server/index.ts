import { Account } from '../types';

export const newAccount: Account = {
  summonerName: 'Trophy Hunter',
  region: 'global',
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
    },
  ],
  trophies: [],
};
