import { Level } from '../../../levels/types';
import { SkillsIcon, SkillsMarker } from '../../../levels/skills';
import skills4 from './skills4';
import {
  billGates,
  dominatingDamage,
  flameHorizon,
  godlike,
  hardHitter,
  intruder,
  landlord,
} from '../../../trophies';

const skills3: Level = {
  island: 'skills',
  name: 'skills3',
  title: 'Skills island Lvl. 3',
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [
    billGates,
    dominatingDamage,
    flameHorizon,
    godlike,
    hardHitter,
    intruder,
    landlord,
  ],
  unlocksLevels: [skills4],
};

export default skills3;
