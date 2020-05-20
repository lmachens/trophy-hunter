import { Trophy } from '../types';
import CombatProgress from './CombatProgress';

const flail: Trophy = {
  island: 'combatIsland',
  name: 'flail',
  level: 'combat1',
  title: 'Flail',
  description:
    'Have the highest damage to champions output per gold. (damage / gold works similar to KDA)',
  ProgressIcon: CombatProgress,
};

export default flail;
