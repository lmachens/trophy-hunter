import { Level } from '../../../levels/types';
import { SpecialIcon, SpecialMarker } from '../../../levels/special';
import { special1 } from '../../special/levels';
import { diversity, greenhorn } from '../../../trophies';
import friendly from '../../../trophies/special/friendly';

const hubSpecial: Level = {
  island: 'hub',
  name: 'hubSpecial',
  title: 'Special',
  Icon: SpecialIcon,
  Marker: SpecialMarker,
  trophies: [greenhorn, friendly, diversity],
  unlocksLevels: [special1],
};

export default hubSpecial;
