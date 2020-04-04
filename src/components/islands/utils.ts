import { ComponentType } from 'react';
import styled from '@emotion/styled';

interface TransformIslandProps {
  name: string;
  top: number;
  left: number;
  Component: ComponentType<IslandProps>;
}

export function transformIsland({
  name,
  top,
  left,
  Component
}: TransformIslandProps) {
  return {
    name,
    top,
    left,
    Component: styled(Component)`
      position: absolute;
      top: ${top}px;
      left: ${left}px;
    `
  };
}

export interface IslandProps extends UserIsland {
  className?: string;
  onClick?(): void;
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

export interface UserIsland {
  status: 'open' | 'done' | 'closed';
  levels: UserLevels;
}

export interface UserIslands {
  [islandName: string]: UserIsland;
}
