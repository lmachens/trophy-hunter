import { Level } from '../../../levels/types';
import { SkillsIcon, SkillsMarker } from '../../../levels/skills';
import skills3 from './skills3';

const skills2: Level = {
  island: 'skills',
  name: 'skills2',
  title: 'Skills island Lvl. 2',
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [
    /* */
  ],
  unlocksLevels: [skills3],
};

export default skills2;
