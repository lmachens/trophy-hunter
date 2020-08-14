import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import teamwork2 from './teamwork2';
import {
  octopus,
  teamEffort,
  teamPlayer,
  theGriffin,
  tripleAssist,
} from '../../../trophies';

const teamwork1: Level = {
  island: 'teamwork',
  name: 'teamwork1',
  title: 'Teamwork island Lvl. 1',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [octopus, teamEffort, teamPlayer, theGriffin, tripleAssist],
  unlocksLevels: [teamwork2],
};

export default teamwork1;
