import React from 'react';
import { warn } from '../../api/logs';
import CombatProgress from '../trophies/combat/CombatProgress';
import EpicProgress from '../trophies/epic/EpicProgress';
import HubProgress from '../trophies/hub/HubProgress';
import ObjectivesProgress from '../trophies/objectives/ObjectivesProgress';
import SkillsProgress from '../trophies/skills/SkillsProgress';
import SpecialProgress from '../trophies/special/SpecialProgress';
import TeamworkProgress from '../trophies/teamwork/TeamworkProgress';
import { ProgressProps } from '../trophies/types';

const progressByCategory = {
  hub: HubProgress,
  combat: CombatProgress,
  skills: SkillsProgress,
  teamwork: TeamworkProgress,
  objectives: ObjectivesProgress,
  epic: EpicProgress,
  special: SpecialProgress,
};

type Props = {
  category: string;
} & ProgressProps;

const TrophyProgress = ({ category, ...rest }: Props) => {
  const Progress = progressByCategory[category];
  if (!Progress) {
    warn(`Unknown category ${category} in TrophyProgress`);
    return null;
  }
  return <Progress {...rest} />;
};

export default TrophyProgress;
