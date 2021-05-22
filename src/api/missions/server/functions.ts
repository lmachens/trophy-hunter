import { allTrophies } from '../../../components/trophies/trophiesByMap';
import { log } from '../../logs';
import { Mission } from '../types';
import { getMissionsCollection } from './collection';

export const generateRandomMission = (
  numberOfTrophies = 10,
  excludeTrophies: string[] = []
): Mission => {
  const randomTrophyNames: string[] = [];

  for (let i = 0; i < numberOfTrophies; i++) {
    let randomIndex: number = Math.floor(Math.random() * allTrophies.length);
    let randomTrophy = allTrophies[randomIndex];
    while (
      randomTrophy.maxProgress &&
      randomTrophyNames.includes(randomTrophy.name) &&
      excludeTrophies.includes(randomTrophy.name)
    ) {
      randomIndex = Math.floor(Math.random() * allTrophies.length);
      randomTrophy = allTrophies[randomIndex];
    }
    randomTrophyNames.push(randomTrophy.name);
  }

  const mission: Mission = {
    active: true,
    trophyNames: randomTrophyNames,
    startDate: new Date(),
  };
  return mission;
};

export const startNewMission = async (): Promise<void> => {
  log('Start new mission');
  const missionsCollection = await getMissionsCollection();
  const activeMission = await missionsCollection.findOne({ active: true });
  const excludeTrophies = activeMission?.trophyNames || [];
  const mission = generateRandomMission(10, excludeTrophies);
  missionsCollection.updateOne({ active: true }, { $set: { active: false } });
  missionsCollection.insertOne(mission);
};
