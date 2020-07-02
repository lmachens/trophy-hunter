import { getJSON } from '../utils/request';

export type APIStatus = ('league' | 'launcher' | 'th')[];

export const getStatus = (): Promise<APIStatus> => {
  return getJSON<APIStatus>('/api/status');
};
