import { useQuery } from 'react-query';
import { getMission } from '../../api/missions';
import { Mission } from '../../api/missions/types';

export const useMission = (): Mission | undefined => {
  const { data: mission } = useQuery('mission', getMission);
  return mission;
};
