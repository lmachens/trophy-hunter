import React from 'react';
import AvailableTrophies from '../trophies/AvailableTrophies';
import * as levels from '../islands/levels';
import islands from '../islands/islands';
import { TargetLevel } from '../levels/types';

type Props = {
  onTrophyClick(level: TargetLevel): void;
};
const MapOverview = ({ onTrophyClick }: Props) => {
  return (
    <AvailableTrophies
      onTrophyClick={(trophy) => {
        const island = islands.find((island) => island.name === trophy.island);
        const level = levels[trophy.level];
        onTrophyClick({
          islandName: island.name,
          level,
          top: island.centerTop,
          left: island.centerLeft,
        });
      }}
    />
  );
};

export default MapOverview;
