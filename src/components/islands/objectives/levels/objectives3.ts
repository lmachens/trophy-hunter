import { Level } from '../../../levels/types';
import { ObjectivesIcon, ObjectivesMarker } from '../../../levels/objectives';
import objectives4 from './objectives4';
import {
  deepSea,
  demolitionPear,
  theCannon,
  theDragonMaster,
} from '../../../trophies';

const objectives3: Level = {
  island: 'objectives',
  name: 'objectives3',
  title: 'Objectives island Lvl. 3',
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [deepSea, demolitionPear, theCannon, theDragonMaster],
  unlocksLevels: [objectives4],
};

export default objectives3;
