import { Level } from '../../../levels/types';
import { SkillsIcon, SkillsMarker } from '../../../levels/skills';
import skills6 from './skills6';
import {
  appetizer,
  carryMode,
  flameBreath,
  glutton,
  theCougar,
} from '../../../trophies';

const skills5: Level = {
  island: 'skills',
  name: 'skills5',
  title: 'Skills island Lvl. 5',
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [appetizer, carryMode, flameBreath, glutton, theCougar],
  unlocksLevels: [skills6],
};

export default skills5;
