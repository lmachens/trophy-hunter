import { Level } from '../../../levels/types';
import { SkillsIcon, SkillsMarker } from '../../../levels/skills';
import { skills1 } from '../../skills/levels';
import { farmer, careful } from '../../../trophies';

const hubSkills: Level = {
  island: 'hub',
  name: 'hubSkills',
  title: 'Skills',
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [careful, farmer],
  unlocksLevels: [skills1],
};

export default hubSkills;
