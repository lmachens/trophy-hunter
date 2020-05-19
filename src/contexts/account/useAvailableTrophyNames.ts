import useAccount from './useAccount';

const useAvailableTrophyNames = () => {
  const { account } = useAccount();
  if (!account) {
    return [];
  }
  const availableTrophyNames = Object.values(account.islands)
    .filter(island => island.status === 'open')
    .reduce((availableTrophyNames, island) => {
      const availableLevelsTrophyNames = Object.values(island.levels)
        .filter(level => ['unlocked', 'active'].includes(level.status))
        .reduce((availableLevelsTrophyNames, level) => {
          const availableLevelTrophyNames = Object.entries(level.trophies)
            .filter(([, trophy]) => trophy.progress !== 1)
            .map(([trophyName]) => trophyName);
          return [...availableLevelsTrophyNames, ...availableLevelTrophyNames];
        }, []);
      return [...availableTrophyNames, ...availableLevelsTrophyNames];
    }, []);

  return availableTrophyNames;
};

export default useAvailableTrophyNames;
