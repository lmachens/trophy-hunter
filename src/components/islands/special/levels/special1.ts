import { Level } from '../../../levels/types';
import { SpecialIcon, SpecialMarker } from '../../../levels/special';
import special2 from './special2';
import {
  adventurer,
  forTheVoid,
  popular,
  privateFirstClass,
  unchanged,
} from '../../../trophies';

const special1: Level = {
  island: 'special',
  name: 'special1',
  title: 'Special island Lvl. 1',
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [adventurer, popular, forTheVoid, unchanged, privateFirstClass],
  unlocksLevels: [special2],
};

export default special1;
