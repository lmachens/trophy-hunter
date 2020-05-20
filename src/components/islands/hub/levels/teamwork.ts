import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import { teamwork1 } from '../../teamwork/levels';

const teamwork: Level = {
  island: 'hub',
  name: 'teamwork',
  title: 'Teamwork',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    /* */
  ],
  unlocksLevels: [teamwork1],
};

export default teamwork;
