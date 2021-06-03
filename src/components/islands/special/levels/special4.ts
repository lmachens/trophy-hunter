import { Level } from '../../../levels/types';
import { SpecialIcon, SpecialMarker } from '../../../levels/special';
import { ancient, oneTrickPony, celebrity, major } from '../../../trophies';

const special4: Level = {
  island: 'special',
  name: 'special4',
  title: 'Special island Lvl. 4',
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [ancient, oneTrickPony, celebrity, major],
  unlocksLevels: [],
};

export default special4;
