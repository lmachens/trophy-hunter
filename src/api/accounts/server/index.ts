import { AccountLevel, AccountTrophy } from '..';
import {
  hubCombat,
  hubEpic,
  hubObjectives,
  hubSkills,
  hubSpecial,
  hubTeamwork,
  welcome,
} from '../../../components/islands/levels';
import { Account } from '../types';
import { trophyToAccountTrophy } from './functions';

const levels = [
  welcome,
  hubCombat,
  hubEpic,
  hubObjectives,
  hubSkills,
  hubSpecial,
  hubTeamwork,
];
export const startingAccountLevels: AccountLevel[] = levels.map((level) => ({
  name: level.name,
  island: 'hub',
  status: 'active',
  unlockedAt: Date.now(),
}));

export const startingTrophies = levels.reduce<AccountTrophy[]>(
  (curr, level) => [...curr, ...level.trophies.map(trophyToAccountTrophy)],
  []
);

export const partialNewAccount: Omit<Account, 'summoner' | 'authTokens'> = {
  islands: [
    {
      name: 'hub',
      status: 'open',
    },
  ],
  levels: startingAccountLevels,
  trophies: startingTrophies,
  games: 0,
  lastGameIds: [],
  trophiesCompleted: 0,
  missions: [],
  missionTrophiesCompleted: 0,
};
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
  ...partialNewAccount,
};
