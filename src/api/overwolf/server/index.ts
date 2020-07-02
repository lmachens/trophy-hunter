import { getJSON } from '../../utils/request';

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

export const getEventStatus = async (gameId: number): Promise<EventStatus> => {
  const eventStatus = await getJSON<EventStatus>(
    `https://game-events-status.overwolf.com/${gameId}_prod.json`
  );
  return eventStatus;
};
