import CombatProgress from './combat/CombatProgress';
import EpicProgress from './epic/EpicProgress';
import ObjectivesProgress from './objectives/ObjectivesProgress';
import SkillsProgress from './skills/SkillsProgress';
import SpecialProgress from './special/SpecialProgress';
import TeamworkProgress from './teamwork/TeamworkProgress';
import { FC } from 'react';
import { ProgressProps, Category } from './types';
import HubProgress from './hub/HubProgress';

export const categoriesMap: {
  [category in Category]: {
    value: Category;
    label: string;
    Icon: FC<ProgressProps>;
  };
} = {
  welcome: {
    value: 'welcome',
    label: 'Welcome',
    Icon: HubProgress,
  },
  combat: {
    value: 'combat',
    label: 'Combat',
    Icon: CombatProgress,
  },
  skills: {
    value: 'skills',
    label: 'Skills',
    Icon: SkillsProgress,
  },
  teamwork: {
    value: 'teamwork',
    label: 'Teamwork',
    Icon: TeamworkProgress,
  },
  objectives: {
    value: 'objectives',
    label: 'Objectives',
    Icon: ObjectivesProgress,
  },
  epic: {
    value: 'epic',
    label: 'Epic',
    Icon: EpicProgress,
  },
  special: {
    value: 'special',
    label: 'Special',
    Icon: SpecialProgress,
  },
};
