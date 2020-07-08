import { Level } from '../../../levels/types';
import { ObjectivesIcon, ObjectivesMarker } from '../../../levels/objectives';
import objectives2 from './objectives2';
import {
  baronNashor,
  dragonSlayer,
  energized,
  neutralizer,
} from '../../../trophies';

const objectives1: Level = {
  island: 'objectives',
  name: 'objectives1',
  title: 'Objectives island Lvl. 1',
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [baronNashor, dragonSlayer, energized, neutralizer],
  unlocksLevels: [objectives2],
};

export default objectives1;
