import { FC } from 'react';
import { Tooltip } from '../tooltip';
import { TargetLevel } from '../levels/types';
import { useUser } from '../../contexts/user';

interface WelcomeGuideProps {
  visibleIslandDetails: boolean;
  targetLevel: TargetLevel;
}

const WelcomeGuide: FC<WelcomeGuideProps> = ({
  visibleIslandDetails,
  targetLevel
}) => {
  const user = useUser();

  const showGuide = user?.islands.hubIsland.levels.welcome.status === 'active';
  if (!showGuide) {
    return null;
  }

  return (
    <>
      {!visibleIslandDetails && (
        <Tooltip
          title="Welcome to Trophy Hunter!"
          text="Click on the first level to open the trophies shelf and view trophies, description and progress."
          placement="bottom"
          targetId="hub"
          offset={20}
        />
      )}
      {targetLevel?.islandName === 'hubIsland' &&
        targetLevel?.level.name === 'welcome' && (
          <Tooltip
            title="It’s all about you :)"
            text="This is your time to conquer the world! Play one game of Summoner’s Rift with the trophy hunter app to begin your journey, once that’s done we will recommend which paths you should begin with based on your personal skills!"
            placement="top"
            targetId="playstyle"
          />
        )}
    </>
  );
};

export default WelcomeGuide;
