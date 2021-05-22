import { getJSON } from '../utils/request';
import { Mission } from './types';

export const getMission = () => {
  return getJSON<Mission>('/api/mission');
};
