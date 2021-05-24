import { Credential } from '../accounts';
import { getJSON } from '../utils/request';
import { HistoryMatch } from './types';
export * from './types';

type GetHistoryMatchesProps = {
  onlyWithTrophies: boolean;
  page: number;
} & Credential;
type GetHistoryMatchesResult = {
  data: HistoryMatch[];
  currentPage: number;
  pages: number;
  count: number;
  limit: number;
  hasMore: boolean;
};
export const getHistoryMatches = ({
  summonerName,
  platformId,
  onlyWithTrophies,
  page,
}: GetHistoryMatchesProps) => {
  return getJSON<GetHistoryMatchesResult>(
    `/api/matches?summonerName=${summonerName}&platformId=${platformId}&onlyWithTrophies=${onlyWithTrophies}&page=${page}`
  ).then((result) => {
    result.data.forEach((match) => {
      match.gameCreatedAt = new Date(match.gameCreatedAt);
    });
    return result;
  });
};
