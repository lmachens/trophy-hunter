import { Level } from '../../../components/levels/types';
import * as levels from '../../../components/islands/levels';
import { getAccountsCollection } from './collection';
import { Ranking } from '../types';

export const isLevelNearlyCompleted = (
  level: Level,
  trophiesCompleted: number
) => trophiesCompleted / level.trophies.length >= 0.8;
export const isLevelCompleted = (level: Level, trophiesCompleted: number) =>
  trophiesCompleted / level.trophies.length >= 1;

export const getUnlockedIslandNames = (level) =>
  level.unlocksLevels.map((level) => levels[level.name].island);

export const getRankings = async () => {
  const Accounts = await getAccountsCollection();
  const rankings = await Accounts.find()
    .sort({ trophiesCompleted: -1 })
    .limit(50)
    .map<Ranking>((account) => ({
      summonerName: account.summoner.name,
      profileIconId: account.summoner.profileIconId,
      islands: account.islands.map((island) => island.name),
      trophiesCompleted: account.trophiesCompleted,
    }))
    .toArray();

  return rankings;
};
