import { Level } from '../../../levels/types';
import { SpecialIcon, SpecialMarker } from '../../../levels/special';
import { special1 } from '../../special/levels';
import { greenhorn } from '../../../trophies';

const hubSpecial: Level = {
  island: 'hub',
  name: 'hubSpecial',
  title: 'Special',
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [greenhorn],
  unlocksLevels: [special1],
};

export default hubSpecial;
