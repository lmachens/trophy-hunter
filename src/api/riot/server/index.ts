import getConfig from 'next/config';
import { getJSON } from '../../utils/request';
import { Summoner, Match, MatchTimeline } from '../types';

const { serverRuntimeConfig } = getConfig();

const requestRiot = async <T>(input: RequestInfo) => {
  return await getJSON<T>(input, {
    headers: {
      'X-Riot-Token': serverRuntimeConfig.RIOT_API_KEY,
    },
  });
};

export const getSummoner = async ({ platformId, summonerName }) => {
  const summoner = await requestRiot<Summoner>(
    `https://${platformId}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`
  );
  return { platformId, ...summoner };
};

export const getMatch = async ({ platformId, matchId }) => {
  const match = await requestRiot<Match>(
    `https://${platformId}.api.riotgames.com/lol/match/v4/matches/${matchId}`
  );
  return match;
};

export const getTimeline = async ({
  platformId,
  matchId,
}: {
  platformId: string;
  matchId: number;
}): Promise<MatchTimeline> => {
  const timeline = await requestRiot<MatchTimeline>(
    `https://${platformId}.api.riotgames.com/lol/match/v4/timelines/by-match/${matchId}`
  );
  return timeline;
};

export const getRecentVersion = async () => {
  const versions = await getJSON<string[]>(
    'https://ddragon.leagueoflegends.com/api/versions.json'
  );
  return versions[0];
};
