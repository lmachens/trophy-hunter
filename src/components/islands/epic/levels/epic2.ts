import { Level } from '../../../levels/types';
import { EpicIcon, EpicMarker } from '../../../levels/epic';
import {
  theBlackFlag,
  theCat,
  theHive,
  thePhoenix,
  thePiranha,
  thePirate,
  theSheriff,
} from '../../../trophies';

const epic2: Level = {
  island: 'epic',
  name: 'epic2',
  title: 'Epic island Lvl. 2',
  Icon: EpicIcon,
  Marker: EpicMarker,
  trophies: [
    theBlackFlag,
    theCat,
    theHive,
    thePhoenix,
    thePiranha,
    thePirate,
    theSheriff,
  ],
  unlocksLevels: [],
};

export default epic2;
