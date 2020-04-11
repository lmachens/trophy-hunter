import { FC, SVGProps } from 'react';
import { Trophy } from '../trophies/types';

export interface MarkerProps extends SVGProps<SVGGElement> {
  status: 'active' | 'unlocked' | 'locked' | 'completed';
}

export interface Level {
  island: string;
  name: string;
  title: string;
  Icon: React.FC;
  Marker: FC<MarkerProps>;
  trophies: Trophy[];
}

export type TargetLevel = {
  islandName: string;
  level: Level;
  top: number;
  left: number;
};
