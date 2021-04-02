import { Level } from '../../../levels/types';
import { SpecialIcon, SpecialMarker } from '../../../levels/special';
import { ancient, oneTrickPony, celebrity } from '../../../trophies';

const special4: Level = {
  island: 'special',
  name: 'special4',
  title: 'Special island Lvl. 4',
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [ancient, oneTrickPony, celebrity],
  unlocksLevels: [],
};

export default special4;
