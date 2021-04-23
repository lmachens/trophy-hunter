import { Credential } from '../accounts';
import { getJSON } from '../utils/request';
import { HistoryMatch } from './types';
export * from './types';

export const getHistoryMatches = ({ summonerName, platformId }: Credential) => {
  return getJSON<HistoryMatch[]>(
    `/api/matches?summonerName=${summonerName}&platformId=${platformId}`
  ).then((matches) =>
    matches.map((match) => ({
      ...match,
      gameCreatedAt: new Date(match.gameCreatedAt),
    }))
  );
};
