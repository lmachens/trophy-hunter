import { NextPage } from 'next';
import { useState } from 'react';
import { TargetLevel } from '../components/levels/types';
import { WelcomeGuide } from '../components/guides';
import GameLayout from '../layouts/GameLayout';
import usePersistentState from '../hooks/usePersistentState';
import GarenaModal from '../components/modals/GarenaModal';
import useCenterWindow from '../hooks/useCenterWindow';
import Map from '../components/map/Map';
import MapOverview from '../components/map/MapOverview';

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
      aside={
        <MapOverview
          onTrophyClick={(targetLevel) => {
            setActiveTool(null);
            setTargetLevel(targetLevel);
            setVisibleIslandDetails(true);
          }}
        />
      }
      onMainClick={() => {
        setActiveTool(null);
        setTargetLevel(null);
        setVisibleIslandDetails(false);
      }}
    >
      <Map
        targetLevel={targetLevel}
        visibleIslandDetails={visibleIslandDetails}
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
      <WelcomeGuide
        visibleIslandDetails={visibleIslandDetails}
        targetLevel={targetLevel}
      />
      {isGarenaUser && <GarenaModal onClose={() => unsetIsGarenaUser()} />}
    </GameLayout>
  );
};

export default LeagueOfLegends;
