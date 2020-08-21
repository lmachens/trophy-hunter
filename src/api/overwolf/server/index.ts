import { getJSON } from '../../utils/request';
import { LOL_ID, LEAGUE_LAUNCHER_ID } from '..';

type State = 0 | 1 | 2 | 3;

interface EventStatus {
  game_id: number;
  state: State;
  features: {
    name: string;
    state: State;
    keys: {
      name: string;
      type: number;
      state: State;
      is_index: boolean;
      category?: string;
      sample_data: null | string;
    }[];
  }[];
}

const cachedEventStatus = {
  [LOL_ID]: {
    timestamp: 0,
    promise: null,
  },
  [LEAGUE_LAUNCHER_ID]: {
    timestamp: 0,
    promise: null,
  },
};
export const getEventStatus = async (gameId: number): Promise<EventStatus> => {
  const cache = cachedEventStatus[gameId];
  if (cache.timestamp < Date.now() - 1000 * 60) {
    cache.promise = getJSON<EventStatus>(
      `https://game-events-status.overwolf.com/${gameId}_prod.json`
    );
    cache.timestamp = Date.now();
  }
  const eventStatus = await cache.promise;
  return eventStatus;
};
