import { getJSON } from '../utils/request';

export type APIStatus = ('league' | 'launcher' | 'th')[];

export const getStatus = async (): Promise<APIStatus> => {
  try {
    return await getJSON<APIStatus>('/api/status');
  } catch (error) {
    return ['th'];
  }
};
