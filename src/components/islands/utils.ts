import { ComponentType } from 'react';
import styled from '@emotion/styled';
import { Level, TargetLevel } from '../levels/types';

interface TransformIslandProps {
  name: string;
  top: number;
  left: number;
  centerTop: number;
  centerLeft: number;
  Component: ComponentType<IslandProps>;
}

export function transformIsland({
  name,
  top,
  left,
  Component,
  centerTop,
  centerLeft,
}: TransformIslandProps) {
  return {
    name,
    top,
    left,
    Component: styled(Component)`
      position: absolute;
      top: ${top}px;
      left: ${left}px;
    `,
    centerTop,
    centerLeft,
  };
}

export interface IslandProps {
  className?: string;
  targetLevel?: TargetLevel;
  onLevelClick?(level: Level): void;
}

export interface UserLevels {
  [levelName: string]: {
    status: 'active' | 'unlocked' | 'locked' | 'completed';
    trophies: {
      [trophyName: string]: {
        progress: number;
      };
    };
  };
}
