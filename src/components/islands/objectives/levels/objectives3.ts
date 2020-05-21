import { Level } from '../../../levels/types';
import { ObjectivesIcon, ObjectivesMarker } from '../../../levels/objectives';
import objectives4 from './objectives4';

const objectives3: Level = {
  island: 'objectives',
  name: 'objectives3',
  title: 'Objectives island Lvl. 3',
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [
    /* */
  ],
  unlocksLevels: [objectives4],
};

export default objectives3;
