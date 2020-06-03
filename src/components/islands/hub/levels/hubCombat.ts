import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import { combat1 } from '../../combat/levels';

const hubCombat: Level = {
  island: 'hub',
  name: 'hubCombat',
  title: 'Combat',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [
    /* */
  ],
  unlocksLevels: [combat1],
};

export default hubCombat;
