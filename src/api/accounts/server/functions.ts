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
  const rankings = await Accounts.aggregate<Ranking>([
    {
      $project: {
        _id: 0,
        summonerName: '$summoner.name',
        profileIconId: '$summoner.profileIconId',
        islands: '$islands.name',
        completed: {
          $size: {
            $filter: {
              input: '$trophies',
              as: 'trophy',
              cond: { $eq: ['$$trophy.status', 'completed'] },
            },
          },
        },
      },
    },
  ])
    .sort({ completed: -1 })
    .limit(50)
    .toArray();

  return rankings;
};
