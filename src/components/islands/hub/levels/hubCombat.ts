import { Level } from '../../../levels/types';
import { CombatIcon, CombatMarker } from '../../../levels/combat';
import { combat1 } from '../../combat/levels';
import { trophyHunter, enrage, kitchenKnife } from '../../../trophies';

const hubCombat: Level = {
  island: 'hub',
  name: 'hubCombat',
  title: 'Combat',
  Icon: CombatIcon,
  Marker: CombatMarker,
  trophies: [enrage, kitchenKnife, trophyHunter],
  unlocksLevels: [combat1],
};

export default hubCombat;
