import { Level } from '../../../levels/types';
import { ObjectivesIcon, ObjectivesMarker } from '../../../levels/objectives';
import { objectives1 } from '../../objectives/levels';
import { theViking, siegeRam } from '../../../trophies';

const hubObjectives: Level = {
  island: 'hub',
  name: 'hubObjectives',
  title: 'Objectives',
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [siegeRam, theViking],
  unlocksLevels: [objectives1],
};

export default hubObjectives;
