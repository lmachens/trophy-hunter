import { Level } from '../../../components/levels/types';
import * as levels from '../../../components/islands/levels';
import {
  getAccountsCollection,
  getSeasonAccountsCollection,
} from './collection';
import { Ranking } from '../types';
import { Collection } from 'mongodb';
import { Account } from '..';
import { currentSeason } from '../../riot/server';

export const isLevelNearlyCompleted = (
  level: Level,
  trophiesCompleted: number
) => trophiesCompleted / level.trophies.length >= 0.8;
export const isLevelCompleted = (level: Level, trophiesCompleted: number) =>
  trophiesCompleted / level.trophies.length >= 1;

export const getUnlockedIslandNames = (level) =>
  level.unlocksLevels.map((level) => levels[level.name].island);

export const getRankings = async (season: string) => {
  const Accounts = (await (season !== currentSeason
    ? getSeasonAccountsCollection()
    : getAccountsCollection())) as Collection<Account>;
  const query: {
    season?: string;
  } = {};
  if (season !== currentSeason) {
    query.season = season;
  }
  const rankings = await Accounts.find(query)
    .sort({ trophiesCompleted: -1, 'summoner.revisionDate': -1 })
    .limit(50)
    .map<Ranking>((account) => ({
      summonerName: account.summoner.name,
      profileIconId: account.summoner.profileIconId,
      islands: account.islands
        .filter((island) => island.status === 'done')
        .map((island) => island.name),
      trophiesCompleted: account.trophiesCompleted,
    }))
    .toArray();

  return rankings;
};
