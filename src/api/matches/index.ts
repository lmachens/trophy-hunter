import { getJSON } from '../utils/request';
import { HistoryMatch } from './types';
export * from './types';

export const getHistoryMatches = () => {
  return getJSON<HistoryMatch[]>('/api/matches').then((matches) =>
    matches.map((match) => ({
      ...match,
      gameCreatedAt: new Date(match.gameCreatedAt),
    }))
  );
};
