import React, { MouseEvent } from 'react';
import styled from '@emotion/styled';
import ZoomToFit from '../common/ZoomToFit';
import { Islands } from '../islands';
import Background from '../islands/Background';
import LevelPanel from '../levels/LevelPanel';
import { useAccount } from '../../contexts/account';
import { TargetLevel } from '../levels/types';
import islands from '../islands/islands';

const SizeContainer = styled(ZoomToFit)`
  position: absolute;
  width: 820px;
  height: 720px;
  transition: 0.15s;
  margin: 30px;
`;

type Props = {
  targetLevel: TargetLevel;
  visibleIslandDetails: boolean;
  onClick(): void;
  onLevelClick(level: TargetLevel): void;
  onLevelPaneToggleClick(event: MouseEvent): void;
};
const Map = ({
  targetLevel,
  visibleIslandDetails,
  onClick,
  onLevelClick,
  onLevelPaneToggleClick,
}: Props) => {
  const { account } = useAccount();

  const { left, top } = targetLevel || { left: 0, top: 0 };

  return (
    <Islands onClick={onClick}>
      <SizeContainer
        style={{
          left: `calc(50% + ${-left}px)`,
          top: `${-top}px`,
          marginTop: `${top ? 100 : 30}px`,
        }}
      >
        {islands.map(({ name, centerTop, centerLeft, Component: Island }) => (
          <Island
            key={name}
            onLevelClick={(level) => {
              onLevelClick({
                islandName: name,
                level,
                top: centerTop,
                left: centerLeft,
              });
            }}
            targetLevel={targetLevel}
            status={
              account?.islands.find(
                (accountIsland) => accountIsland.name === name
              )?.status || 'closed'
            }
            levels={account?.levels || []}
          />
        ))}
        <Background />
      </SizeContainer>
      <LevelPanel
        level={targetLevel?.level}
        open={visibleIslandDetails}
        onToggleClick={onLevelPaneToggleClick}
      />
    </Islands>
  );
};

export default Map;
