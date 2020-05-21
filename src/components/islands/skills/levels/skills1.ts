import { Level } from '../../../levels/types';
import { SkillsIcon, SkillsMarker } from '../../../levels/skills';
import skills2 from './skills2';

const skills1: Level = {
  island: 'skills',
  name: 'skills1',
  title: 'Skills island Lvl. 1',
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [
    /* */
  ],
  unlocksLevels: [skills2],
};

export default skills1;
