import { Level } from '../../../levels/types';
import { SkillsIcon, SkillsMarker } from '../../../levels/skills';
import { skills1 } from '../../skills/levels';

const skills: Level = {
  island: 'hub',
  name: 'skills',
  title: 'Skills',
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [
    /* */
  ],
  unlocksLevels: [skills1],
};

export default skills;
