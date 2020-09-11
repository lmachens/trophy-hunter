import useAccount from './useAccount';
import { Trophy } from '../../components/trophies/types';

const useTrophyProgress = (trophy: Trophy) => {
  const { account } = useAccount();
  const accountTrophy = account?.trophies.find(
    (accountTrophy) => accountTrophy.name === trophy.name
  );

  return {
    progress: accountTrophy?.progress || 0,
    progressDetails: accountTrophy?.progressDetails || null,
  };
};

export default useTrophyProgress;
