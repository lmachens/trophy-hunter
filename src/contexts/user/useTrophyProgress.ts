import useUser from './useUser';
import { Trophy } from '../../components/trophies/types';

const useTrophyProgress = (trophy: Trophy) => {
  const user = useUser();

  const progress =
    user?.islands[trophy.island]?.levels[trophy.level]?.trophies[trophy.name]
      ?.progress || 0;

  return progress;
};

export default useTrophyProgress;
