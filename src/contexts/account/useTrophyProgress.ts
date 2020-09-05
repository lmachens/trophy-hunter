import useAccount from './useAccount';
import { Trophy } from '../../components/trophies/types';

const useTrophyProgress = (trophy: Trophy) => {
  const { account } = useAccount();
  const progress =
    account?.trophies.find(
      (accountTrophy) => accountTrophy.name === trophy.name
    )?.progress || 0;
  return progress;
};

export default useTrophyProgress;
