import { Level } from '../../../levels/types';
import { TeamworkIcon, TeamworkMarker } from '../../../levels/teamwork';
import teamwork5 from './teamwork5';
import {
  quackery,
  quadraAssist,
  radar,
  rejuvenation,
  sasquatch,
  theBull,
  theCompanion,
} from '../../../trophies';

const teamwork4: Level = {
  island: 'teamwork',
  name: 'teamwork4',
  title: 'Teamwork island Lvl. 4',
  Icon: TeamworkIcon,
  Marker: TeamworkMarker,
  trophies: [
    quackery,
    quadraAssist,
    radar,
    rejuvenation,
    sasquatch,
    theBull,
    theCompanion,
  ],
  unlocksLevels: [teamwork5],
};

export default teamwork4;
