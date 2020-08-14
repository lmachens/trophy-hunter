import { Level } from '../../../levels/types';
import { ObjectivesIcon, ObjectivesMarker } from '../../../levels/objectives';
import {
  siegeMaster,
  theGrandChallenge,
  theSphinx,
  tornado,
  unlockTheBeast,
} from '../../../trophies';

const objectives5: Level = {
  island: 'objectives',
  name: 'objectives5',
  title: 'Objectives island Lvl. 5',
  Icon: ObjectivesIcon,
  Marker: ObjectivesMarker,
  trophies: [
    siegeMaster,
    theGrandChallenge,
    theSphinx,
    tornado,
    unlockTheBeast,
  ],
  unlocksLevels: [],
};

export default objectives5;
