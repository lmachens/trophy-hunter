import { Level } from '../../../levels/types';
import { SpecialIcon, SpecialMarker } from '../../../levels/special';
import special3 from './special3';
import {
  experienced,
  prominent,
  specialist,
  valentines,
} from '../../../trophies';

const special2: Level = {
  island: 'special',
  name: 'special2',
  title: 'Special island Lvl. 2',
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [experienced, prominent, valentines, specialist],
  unlocksLevels: [special3],
};

export default special2;
