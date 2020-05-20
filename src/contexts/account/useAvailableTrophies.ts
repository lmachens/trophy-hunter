import useAccount from './useAccount';
import * as levels from '../../components/islands/levels';
import { Level } from '../../components/levels/types';

const useAvailableTrophies = () => {
  const { account } = useAccount();
  if (!account) {
    return [];
  }
  const availableTrophies = account.levels
    .filter((level) => level.status === 'active')
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

  return availableTrophies;
};

export default useAvailableTrophies;
