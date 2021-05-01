import { getJSON } from '../utils/request';
import { StatsObj, TrophyStatsAggregationObj } from './types';

export const getStats = (): Promise<StatsObj> => {
  return getJSON<StatsObj>('/api/stats');
};

export const getTrophyStats = (
  name: string
): Promise<TrophyStatsAggregationObj> => {
  return getJSON<TrophyStatsAggregationObj>(`/api/trophy-stats/${name}`);
};
