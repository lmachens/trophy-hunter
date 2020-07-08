import { Level } from '../../../levels/types';
import { ObjectivesIcon, ObjectivesMarker } from '../../../levels/objectives';
import objectives3 from './objectives3';
import { earlyBird, explosiveCharge, dragonLord } from '../../../trophies';

const objectives2: Level = {
  island: 'objectives',
  name: 'objectives2',
  title: 'Objectives island Lvl. 2',
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [earlyBird, explosiveCharge, dragonLord],
  unlocksLevels: [objectives3],
};

export default objectives2;
