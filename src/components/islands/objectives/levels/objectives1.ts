import { Level } from '../../../levels/types';
import { ObjectivesIcon, ObjectivesMarker } from '../../../levels/objectives';
import objectives2 from './objectives2';

const objectives1: Level = {
  island: 'objectives',
  name: 'objectives1',
  title: 'Objectives island Lvl. 1',
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [],
  unlocksLevels: [objectives2],
};

export default objectives1;
