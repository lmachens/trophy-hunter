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
  try {
    const summoner = await requestRiot<Summoner>(
      `https://${platformId}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
        summonerName
      )}`
    );
    return { platformId, ...summoner };
  } catch (error) {
    console.error(
      `getSummoner ${platformId} ${summonerName} ${error.status} ${error.statusText}`
    );
    return null;
  }
};

export const getMatch = async ({ platformId, matchId }) => {
  try {
    const match = await requestRiot<Match>(
      `https://${platformId}.api.riotgames.com/lol/match/v4/matches/${matchId}`
    );
    return match;
  } catch (error) {
    console.error(
      `getMatch ${platformId} ${matchId} ${error.status} ${error.statusText}`
    );
    return null;
  }
};

export const getTimeline = async ({
  platformId,
  matchId,
}: {
  platformId: string;
  matchId: number;
}): Promise<MatchTimeline> => {
  try {
    const timeline = await requestRiot<MatchTimeline>(
      `https://${platformId}.api.riotgames.com/lol/match/v4/timelines/by-match/${matchId}`
    );
    return timeline;
  } catch (error) {
    console.error(
      `getTimeline ${platformId} ${matchId}  ${error.status} ${error.statusText}`
    );
    return null;
  }
};

export const getMatchAndTimeline = ({ platformId, matchId }) =>
  Promise.all([
    getMatch({
      platformId,
      matchId,
    }),
    getTimeline({
      platformId,
      matchId,
    }),
  ]);

const cachedVersion = {
  timestamp: 0,
  promise: null,
};
export const getRecentVersion = async () => {
  try {
    if (cachedVersion.timestamp < Date.now() - 1000 * 60 * 60) {
      cachedVersion.promise = getJSON<string[]>(
        'https://ddragon.leagueoflegends.com/api/versions.json'
      );
      cachedVersion.timestamp = Date.now();
    }
    const versions = await cachedVersion.promise;
    return versions[0];
  } catch (error) {
    console.error(`getRecentVersion ${error.status} ${error.statusText}`);
    return null;
  }
};

interface Champion {
  key: string;
  image: {
    full: string;
  };
}
interface ChampionResult {
  type: 'champion';
  format: 'standAloneComplex';
  version: string;
  data: {
    [name: string]: Champion;
  };
}
const cachedChampions = {
  timestamp: 0,
  promise: null,
};
export const getChampions = async () => {
  try {
    if (cachedChampions.timestamp < Date.now() - 1000 * 60 * 60) {
      const version = await getRecentVersion();
      cachedChampions.promise = getJSON<ChampionResult>(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
      );
      cachedChampions.timestamp = Date.now();
    }
    const champions = await cachedChampions.promise;
    return Object.values(champions.data) as Champion[];
  } catch (error) {
    console.error(`getChampions ${error.status} ${error.statusText}`);
    return null;
  }
};
