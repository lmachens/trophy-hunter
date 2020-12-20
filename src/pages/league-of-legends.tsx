import { NextPage } from 'next';
import styled from '@emotion/styled';
import { useState } from 'react';
import { TargetLevel } from '../components/levels/types';
import { WelcomeGuide } from '../components/guides';
import GameLayout from '../layouts/GameLayout';
import { VideoAds } from '../components/ads';
import usePersistentState from '../hooks/usePersistentState';
import GarenaModal from '../components/modals/GarenaModal';
import useCenterWindow from '../hooks/useCenterWindow';
import Map from '../components/map/Map';
import MapOverview from '../components/map/MapOverview';
import Profile from '../components/trophies/Profile';

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
  useCenterWindow();

  return (
    <GameLayout
      activeTool={activeTool}
      onToolClick={(tool) => {
        setVisibleIslandDetails(null);
        setTargetLevel(null);
        setActiveTool(activeTool === tool ? null : tool);
      }}
    >
      <Map
        targetLevel={targetLevel}
        visibleIslandDetails={visibleIslandDetails}
        onClick={() => {
          setActiveTool(null);
          setTargetLevel(null);
          setVisibleIslandDetails(false);
        }}
        onLevelClick={(level) => {
          setActiveTool(null);
          setTargetLevel(level);
          setVisibleIslandDetails(true);
        }}
        onLevelPaneToggleClick={(event) => {
          event.stopPropagation();
          setActiveTool(null);
          if (visibleIslandDetails) {
            setVisibleIslandDetails(false);
            setTargetLevel(null);
          } else {
            setVisibleIslandDetails(true);
          }
        }}
      />
      <Side>
        <Overview>
          <Profile />
          <MapOverview
            onTrophyClick={(targetLevel) => {
              setActiveTool(null);
              setTargetLevel(targetLevel);
              setVisibleIslandDetails(true);
            }}
          />
          <VideoAds />
        </Overview>
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
