import { getJSON } from '../utils/request';
import { StatsObj } from './types';

export const getStats = (): Promise<StatsObj> => {
  return getJSON<StatsObj>('/api/stats');
};
