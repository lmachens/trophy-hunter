import { Level } from '../../../levels/types';
import { SpecialIcon, SpecialMarker } from '../../../levels/special';
import special2 from './special2';

const special1: Level = {
  island: 'special',
  name: 'special1',
  title: 'Special island Lvl. 1',
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [
    /* */
  ],
  unlocksLevels: [special2],
};

export default special1;
