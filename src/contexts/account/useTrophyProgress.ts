import useAccount from './useAccount';
import { Trophy } from '../../components/trophies/types';

const useTrophyProgress = (trophy: Trophy) => {
  const account = useAccount();

  const progress =
    account?.islands[trophy.island]?.levels[trophy.level]?.trophies[trophy.name]
      ?.progress || 0;
  return progress;
};

export default useTrophyProgress;
