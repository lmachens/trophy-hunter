import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import teamwork3 from './teamwork3';

const teamwork2: Level = {
  island: 'teamwork',
  name: 'teamwork2',
  title: 'Teamwork island Lvl. 2',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    /* */
  ],
  unlocksLevels: [teamwork3],
};

export default teamwork2;
