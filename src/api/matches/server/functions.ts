import { HistoryMatch } from '../types';
import { getMatchesCollection } from './collection';

export const getHistoryMatches = async (accountId: string) => {
  const Matches = await getMatchesCollection();
  const matches = await Matches.find({ accountId })
    .sort({ gameCreation: -1 })
    .limit(20)
    .toArray();

  return matches;
};

export const addHistoryMatch = async (match: HistoryMatch) => {
  console.log(match);
  console.log(JSON.stringify(match));
  const Matches = await getMatchesCollection();
  return await Matches.insertOne(match);
};
