import { FC, HTMLAttributes, useState } from 'react';
import styled from '@emotion/styled';
import { Trophy } from './types';
import { useTrophyProgress } from '../../contexts/account';
import MissionStar from '../icons/MissionStar';
import Grow from '../common/Grow';
import ProgressBar from '../common/ProgressBar';
import { categoriesMap } from './categories';
import { Account } from '../../api/accounts';
import Flag from '../icons/Flag';
import { Tooltip } from '../tooltip';
import TrophyStats from './TrophyStats';
import Aram from '../icons/Aram';
import TrophyModal from '../modals/TrophyModal';
import { useMission } from '../../contexts/account/useMission';

interface ListItemProps {
  borderless?: boolean;
  island?: string;
}
const ListItem = styled.div<ListItemProps>`
  cursor: pointer;
  background-color: #2b2a30;
  padding: 10px;
  margin-bottom: 4px;
  display: flex;
  border-top: ${(props) => (props.borderless ? 'none' : '1px solid #3f3e43')};

  &:hover {
    background-color: #3e3d42;
  }

  svg {
    flex-shrink: 0;
  }

  p {
    white-space: break-spaces;
  }
`;

interface TrophyListItemProps
  extends ListItemProps,
    HTMLAttributes<HTMLDivElement> {
  account?: Account;
  trophy: Trophy;
  progress?: number;
}

const Progress = styled.div`
  margin: 0px 10px 6px 6px;
  flex-shrink: 0;
  width: 12px;
`;

const Title = styled.h3`
  display: inline;
  font-family: 'Roboto Mono', monospace;
  margin-right: 0.5em;
`;

const TrophyListItem: FC<TrophyListItemProps> = ({
  account,
  trophy,
  borderless,
  progress,
  ...props
}) => {
  if (!trophy) {
    return null;
  }
  const [showModal, setShowModal] = useState(false);
  const mission = useMission();
  const missionTrophyNames = mission?.trophyNames || [];

  const { progress: trophyProgress, progressDetails } =
    typeof progress !== 'undefined'
      ? { progress, progressDetails: null }
      : useTrophyProgress(account, trophy);
  const ProgressIcon = categoriesMap[trophy.category].Icon;
  return (
    <ListItem
      borderless={borderless}
      {...props}
      onClick={() => setShowModal(true)}
    >
      <Progress>
        <ProgressIcon progress={trophyProgress} />
      </Progress>
      <Grow>
        <Title>{trophy.title}</Title>
        <TrophyStats trophyName={trophy.name} />
        <p>{trophy.description}</p>
        {trophy.maxProgress && (
          <ProgressBar
            progress={trophyProgress}
            max={trophy.maxProgress}
            category={trophy.category}
          />
        )}
        {trophy.ProgressDetails && (
          <trophy.ProgressDetails
            details={progressDetails}
            maxProgress={trophy.maxProgress}
          />
        )}
      </Grow>
      {trophy.aramSupport && (
        <Tooltip
          text="This trophy is also achievable in ARAM"
          placement="bottomRight"
        >
          <Aram />
        </Tooltip>
      )}
      {!trophy.checkLive && (
        <Tooltip
          text="This trophy doesn't have live-progress tracking"
          placement="bottomRight"
        >
          <Flag onClick={(event) => event.stopPropagation()} />
        </Tooltip>
      )}
      {missionTrophyNames.includes(trophy.name) && (
        <Tooltip
          text="This trophy is part of this weeks mission. Mission trophies are shuffled every Sunday and are not part of the trophies count."
          placement="bottomRight"
        >
          <MissionStar />
        </Tooltip>
      )}
      {showModal && (
        <TrophyModal trophy={trophy} onClose={() => setShowModal(false)} />
      )}
    </ListItem>
  );
};

export default TrophyListItem;
