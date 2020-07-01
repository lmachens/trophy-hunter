import { Account, AccountTrophy } from './types';

export const getTrophy = (
  account: Account,
  trophyName: string
): AccountTrophy => {
  return account.trophies.find((trophy) => trophy.name === trophyName);
};

export const getTrophyProgress = (
  account: Account,
  trophyName: string
): number => {
  const trophy = getTrophy(account, trophyName);
  return trophy ? trophy.progress : 0;
};
