import { NextPage } from 'next';
import styled from '@emotion/styled';
import {
  Islands,
  CombatIsland,
  SkillsIsland,
  HubIsland,
  TeamworkIsland,
  SpecialIsland,
  EpicIsland,
  ObjectivesIsland,
} from '../components/islands';
import { transformIsland } from '../components/islands/utils';
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

const islands = [
  transformIsland({
    name: 'combatIsland',
    top: 56,
    left: 0,
    Component: CombatIsland,
    centerTop: 0,
    centerLeft: 0,
  }),
  transformIsland({
    name: 'skillsIsland',
    top: 8,
    left: 285,
    Component: SkillsIsland,
    centerTop: 0,
    centerLeft: 140,
  }),
  transformIsland({
    name: 'teamworkIsland',
    top: 20,
    left: 535,
    Component: TeamworkIsland,
    centerTop: 0,
    centerLeft: 350,
  }),
  transformIsland({
    name: 'specialIsland',
    top: 320,
    left: 0,
    Component: SpecialIsland,
    centerTop: 0,
    centerLeft: 0,
  }),
  transformIsland({
    name: 'epicIsland',
    top: 460,
    left: 260,
    Component: EpicIsland,
    centerTop: 0,
    centerLeft: 140,
  }),
  transformIsland({
    name: 'objectivesIsland',
    top: 295,
    left: 530,
    Component: ObjectivesIsland,
    centerTop: 0,
    centerLeft: 350,
  }),
  transformIsland({
    name: 'hubIsland',
    top: 250,
    left: 275,
    Component: HubIsland,
    centerTop: 0,
    centerLeft: 140,
  }),
];

const SizeContainer = styled.div`
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
            left: `${-left}px`,
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
          <VideoAds />
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
    </GameLayout>
  );
};

export default LeagueOfLegends;
