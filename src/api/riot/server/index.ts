import getConfig from 'next/config';
import { getJSON } from '../../utils/request';
import { Summoner } from '../types';

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
