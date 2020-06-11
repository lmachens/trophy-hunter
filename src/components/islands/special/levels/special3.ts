import { Level } from '../../../levels/types';
import { SpecialIcon, SpecialMarker } from '../../../levels/special';
import special4 from './special4';
import { master, wisdom } from '../../../trophies';

const special3: Level = {
  island: 'special',
  name: 'special3',
  title: 'Special island Lvl. 3',
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [wisdom, master],
  unlocksLevels: [special4],
};

export default special3;
