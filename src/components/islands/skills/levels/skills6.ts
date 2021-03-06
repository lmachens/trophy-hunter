import { Level } from '../../../levels/types';
import { SkillsIcon, SkillsMarker } from '../../../levels/skills';
import {
  leagueOfDraven,
  tarzan,
  theBee,
  theGoblin,
  theTiger,
} from '../../../trophies';

const skills6: Level = {
  island: 'skills',
  name: 'skills6',
  title: 'Skills island Lvl. 6',
  Icon: SkillsIcon,
  Marker: SkillsMarker,
  trophies: [leagueOfDraven, tarzan, theBee, theGoblin, theTiger],
  unlocksLevels: [],
};

export default skills6;
