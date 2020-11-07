import { FC } from 'react';
import { Tooltip } from '../tooltip';
import { TargetLevel } from '../levels/types';
import { useAccount } from '../../contexts/account';
import styled from '@emotion/styled';
import { bounce } from '../../styles/animations';

interface WelcomeGuideProps {
  visibleIslandDetails: boolean;
  targetLevel: TargetLevel;
}

const WelcomeTooltip = styled(Tooltip)`
  animation: ${bounce} 2s ease infinite;
`;

const WelcomeGuide: FC<WelcomeGuideProps> = ({
  visibleIslandDetails,
  targetLevel,
}) => {
  const { account } = useAccount();

  const showGuide =
    account?.levels.find((level) => level.name === 'welcome')?.status ===
    'active';
  if (!showGuide) {
    return null;
  }

  return (
    <>
      {!visibleIslandDetails && (
        <WelcomeTooltip
          title="Welcome to Trophy Hunter!"
          text="Click on the first levels to open the trophies shelf and view trophies, description and progress."
          placement="bottom"
          targetId="hub"
          offset={10}
        />
      )}
      {targetLevel?.islandName === 'hub' &&
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
