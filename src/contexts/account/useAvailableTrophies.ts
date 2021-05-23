import * as levels from '../../components/islands/levels';
import { Level } from '../../components/levels/types';
import { useMemo } from 'react';
import { Trophy } from '../../components/trophies/types';
import { Account } from '../../api/accounts';
import { allTrophies } from '../../components/trophies/trophiesByMap';
import { useMission } from './useMission';

const useAvailableTrophies = (account: Account) => {
  const mission = useMission();
  const missionTrophyNames = mission?.trophyNames || [];

  const availableTrophies = useMemo(() => {
    if (!account) {
      return [];
    }
    const availableTrophies = account.levels
      .sort((a, b) => b.unlockedAt - a.unlockedAt)
      .reduce<Trophy[]>((availableTrophies, activeLevel) => {
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
    const accountMission = account.missions.find(
      (accountMission) =>
        accountMission.missionId.toString() === mission._id.toString()
    );
    const accountMissionTrophyNames =
      accountMission?.completedTrophyNames || [];

    missionTrophyNames.forEach((missionTrophyName) => {
      if (
        !availableTrophies.some(
          (availableTrophy) => availableTrophy.name === missionTrophyName
        ) &&
        !accountMissionTrophyNames.includes(missionTrophyName)
      ) {
        const trophy = allTrophies.find(
          (trophy) => trophy.name === missionTrophyName
        );
        availableTrophies.push(trophy);
      }
    });

    return availableTrophies;
  }, [account, missionTrophyNames]);

  return availableTrophies;
};

export default useAvailableTrophies;
