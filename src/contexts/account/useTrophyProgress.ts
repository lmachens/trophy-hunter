import { Trophy } from '../../components/trophies/types';
import { Account } from '../../api/accounts';

const useTrophyProgress = (account: Account, trophy: Trophy) => {
  const accountTrophy = account?.trophies.find(
    (accountTrophy) => accountTrophy.name === trophy.name
  );

  return {
    progress: accountTrophy?.progress || 0,
    progressDetails: accountTrophy?.progressDetails || null,
  };
};

export default useTrophyProgress;
