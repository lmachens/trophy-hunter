import { NextPage } from 'next';
import styled from '@emotion/styled';
import { Islands } from '../components/islands';
import Background from '../components/islands/Background';
import { useState } from 'react';
import LevelPanel from '../components/levels/LevelPanel';
import { TargetLevel } from '../components/levels/types';
import { WelcomeGuide } from '../components/guides';
import GameLayout from '../layouts/GameLayout';
import Profile from '../components/trophies/Profile';
import AvailableTrophies from '../components/trophies/AvailableTrophies';
import { VideoAds } from '../components/ads';
import * as levels from '../components/islands/levels';
import usePersistentState from '../hooks/usePersistentState';
import GarenaModal from '../components/modals/GarenaModal';
import islands from '../components/islands/islands';
import { useAccount } from '../contexts/account';
import ZoomToFit from '../components/common/ZoomToFit';

const SizeContainer = styled(ZoomToFit)`
  position: absolute;
  width: 820px;
  height: 720px;
  transition: 0.15s;
  margin: 30px;
`;

const Side = styled.div`
  position: relative;
  width: 440px;
`;

const Overview = styled.aside`
  padding: 48px 20px 20px 20px;
  background: #1f1f1f;
  border-left: 1px solid #77777a;
  width: 440px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
`;

const LeagueOfLegends: NextPage = () => {
  const [activeTool, setActiveTool] = useState(null);
  const [targetLevel, setTargetLevel] = useState<TargetLevel>(null);
  const [visibleIslandDetails, setVisibleIslandDetails] = useState(false);
  const [isGarenaUser, , unsetIsGarenaUser] = usePersistentState(
    'isGarenaUser',
    null
  );
  const { account } = useAccount();

  const { left, top } = targetLevel || { left: 0, top: 0 };
  return (
    <GameLayout
      activeTool={activeTool}
      onToolClick={(tool) => {
        setVisibleIslandDetails(null);
        setTargetLevel(null);
        setActiveTool(activeTool === tool ? null : tool);
      }}
    >
      <Islands
        onClick={() => {
          setActiveTool(null);
          setTargetLevel(null);
          setVisibleIslandDetails(false);
        }}
      >
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
                setActiveTool(null);
                setTargetLevel({
                  islandName: name,
                  level,
                  top: centerTop,
                  left: centerLeft,
                });
                setVisibleIslandDetails(true);
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
      </Islands>
      <Side>
        <Overview>
          <Profile />
          <AvailableTrophies
            onTrophyClick={(trophy) => {
              const island = islands.find(
                (island) => island.name === trophy.island
              );
              const level = levels[trophy.level];
              setActiveTool(null);
              setTargetLevel({
                islandName: island.name,
                level,
                top: island.top,
                left: island.left,
              });
              setVisibleIslandDetails(true);
            }}
          />
          <VideoAds showIngame={false} />
        </Overview>
        <LevelPanel
          level={targetLevel?.level}
          open={visibleIslandDetails}
          onToggleClick={() => {
            setActiveTool(null);
            if (visibleIslandDetails) {
              setVisibleIslandDetails(false);
              setTargetLevel(null);
            } else {
              setVisibleIslandDetails(true);
            }
          }}
        />
      </Side>
      <WelcomeGuide
        visibleIslandDetails={visibleIslandDetails}
        targetLevel={targetLevel}
      />
      {isGarenaUser && <GarenaModal onClose={() => unsetIsGarenaUser()} />}
    </GameLayout>
  );
};

export default LeagueOfLegends;
