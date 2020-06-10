import { getJSON } from '../utils/request';

export const getRecentVersion = () => {
  return getJSON<{
    riot: string;
  }>('/api/version');
};
