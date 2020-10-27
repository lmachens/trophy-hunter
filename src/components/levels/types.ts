import { FC, SVGProps } from 'react';
import { Trophy } from '../trophies/types';

export interface MarkerProps extends SVGProps<SVGGElement> {
  status: 'active' | 'unlocked' | 'locked' | 'completed';
  focused: boolean;
  level: Level;
}

export type Island =
  | 'hub'
  | 'combat'
  | 'skills'
  | 'teamwork'
  | 'special'
  | 'epic'
  | 'objectives';

export interface Level {
  island: Island;
  name: string;
  title: string;
  Icon: React.FC;
  Marker: FC<MarkerProps>;
  trophies: Trophy[];
  unlocksLevels: Level[];
}

export type TargetLevel = {
  islandName: string;
  level: Level;
  top: number;
  left: number;
};
