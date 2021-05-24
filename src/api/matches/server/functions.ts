import type { FilterQuery } from 'mongodb';
import type { HistoryMatch } from '../types';
import { getMatchesCollection } from './collection';

const HISTORY_LIMIT = 20;
export const getHistoryMatches = async (
  accountId: string,
  onlyWithTrophies: boolean,
  page: number
) => {
  const Matches = await getMatchesCollection();
  const query: FilterQuery<HistoryMatch> = {
    accountId,
  };
  if (onlyWithTrophies) {
    query.trophyNames = { $exists: true, $ne: [] };
  }
  const cursor = await Matches.find(query).sort({ gameCreatedAt: -1 });
  const count = await cursor.count();
  const pages = Math.round(count / HISTORY_LIMIT);
  const data = await cursor
    .skip(page * HISTORY_LIMIT)
    .limit(HISTORY_LIMIT)
    .toArray();

  const hasMore = count - (page + 1) * HISTORY_LIMIT > 0;
  return {
    data,
    currentPage: page,
    pages,
    count,
    limit: HISTORY_LIMIT,
    hasMore,
  };
};

export const addHistoryMatch = async (match: HistoryMatch) => {
  const Matches = await getMatchesCollection();
  return await Matches.insertOne(match);
};
