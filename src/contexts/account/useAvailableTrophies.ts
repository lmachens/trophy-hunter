import useAccount from './useAccount';
import * as levels from '../../components/islands/levels';
import { Level } from '../../components/levels/types';
import { useMemo } from 'react';

const useAvailableTrophies = () => {
  const { account } = useAccount();

  const availableTrophies = useMemo(() => {
    if (!account) {
      return [];
    }
    return account.levels
      .filter((level) => level.status === 'active')
      .sort((a, b) => b.unlockedAt - a.unlockedAt)
      .reduce((availableTrophies, activeLevel) => {
        const level: Level = levels[activeLevel.name];
        if (!level) {
          return availableTrophies;
        }
        const trophies = level.trophies.filter((trophy) => {
          const accountTrophy = account.trophies.find(
            (accountTrophy) => accountTrophy.name === trophy.name
          );
          return !accountTrophy || accountTrophy.status !== 'completed';
        });
        return [...availableTrophies, ...trophies];
      }, []);
  }, [account]);

  return availableTrophies;
};

export default useAvailableTrophies;
