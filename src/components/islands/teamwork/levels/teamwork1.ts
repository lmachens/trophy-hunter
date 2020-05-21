import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import teamwork2 from './teamwork2';

const teamwork1: Level = {
  island: 'teamwork',
  name: 'teamwork1',
  title: 'Teamwork island Lvl. 1',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [],
  unlocksLevels: [teamwork2],
};

export default teamwork1;
