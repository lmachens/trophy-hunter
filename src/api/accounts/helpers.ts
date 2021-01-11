import { Account, AccountTrophy } from './types';
import { Participant } from '../riot/types';

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
  const progress = trophy?.progress || 0;
  if (progress === Infinity || progress === -Infinity || isNaN(progress)) {
    return 0;
  }
  return progress;
};

export const getTrophyProgressDetails = (
  account: Account,
  trophyName: string
): any => {
  const trophy = getTrophy(account, trophyName);
  const progressDetails = trophy?.progressDetails || [];
  return progressDetails;
};

export const findPerk = (
  participant: Participant,
  perkId: number
): {
  var1: number;
  var2: number;
  var3: number;
} => {
  for (let i = 0; i < 6; i++) {
    if (participant.stats[`perk${i}`] === perkId) {
      return {
        var1: participant.stats[`perk${i}Var1`],
        var2: participant.stats[`perk${i}Var2`],
        var3: participant.stats[`perk${i}Var3`],
      };
    }
  }
  return {
    var1: 0,
    var2: 0,
    var3: 0,
  };
};
