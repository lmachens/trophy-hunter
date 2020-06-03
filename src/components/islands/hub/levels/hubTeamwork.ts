import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import { teamwork1 } from '../../teamwork/levels';

const hubTeamwork: Level = {
  island: 'hub',
  name: 'hubTeamwork',
  title: 'Teamwork',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    /* */
  ],
  unlocksLevels: [teamwork1],
};

export default hubTeamwork;
