import useUser from './useUser';

const useAvailableTrophyNames = () => {
  const user = useUser();
  if (!user) {
    return [];
  }
  const availableTrophyNames = Object.values(user.islands)
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
