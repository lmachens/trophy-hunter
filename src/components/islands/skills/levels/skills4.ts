import { Level } from '../../../levels/types';
import { SkillsIcon, SkillsMarker } from '../../../levels/skills';
import skills5 from './skills5';
import { legendary, lunatic } from '../../../trophies';

const skills4: Level = {
  island: 'skills',
  name: 'skills4',
  title: 'Skills island Lvl. 4',
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [legendary, lunatic],
  unlocksLevels: [skills5],
};

export default skills4;
