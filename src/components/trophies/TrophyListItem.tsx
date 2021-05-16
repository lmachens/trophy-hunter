import { FC, HTMLAttributes, useState } from 'react';
import styled from '@emotion/styled';
import { Trophy } from './types';
import { useAccount, useTrophyProgress } from '../../contexts/account';
import FavoritesFilter from '../icons/FavoritesFilter';
import Grow from '../common/Grow';
import ProgressBar from '../common/ProgressBar';
import { categoriesMap } from './categories';
import { useQueryClient, useMutation } from 'react-query';
import { Account, patchAccount } from '../../api/accounts';
import { toggleArrayElement } from '../../api/utils/arrays';
import Flag from '../icons/Flag';
import { Tooltip } from '../tooltip';
import TrophyStats from './TrophyStats';
import { trackFavorite } from '../../api/performance';
import Aram from '../icons/Aram';
import TrophyModal from '../modals/TrophyModal';

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
  disableFavorite?: boolean;
  progress?: number;
}

const Progress = styled.div`
  margin: 0px 10px 6px 6px;
  flex-shrink: 0;
  width: 12px;
`;

interface FavoriteProps {
  active: boolean;
}

const Favorite = styled((props) => (
  <FavoritesFilter {...props} active={undefined} />
))`
  flex-shrink: 0;
  fill: ${(props: FavoriteProps) => (props.active ? '#77777A' : '#1F1F1F')};
  stroke: #77777a;
  cursor: pointer;
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
  disableFavorite,
  ...props
}) => {
  if (!trophy) {
    return null;
  }
  const { account: ownAccount } = useAccount();

  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);

  const { mutate: patch } = useMutation(patchAccount, {
    onSuccess: () => {
      queryClient.invalidateQueries('account');
    },
  });
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
      {!disableFavorite &&
        account &&
        account?._id === ownAccount?._id &&
        trophyProgress < 1 && (
          <Favorite
            active={account.favoriteTrophyNames.includes(trophy.name)}
            onClick={(event) => {
              event.stopPropagation();
              patch({
                favoriteTrophyNames: toggleArrayElement(
                  account.favoriteTrophyNames,
                  trophy.name
                ),
              });
              trackFavorite(trophy.name);
            }}
          />
        )}
      {showModal && (
        <TrophyModal trophy={trophy} onClose={() => setShowModal(false)} />
      )}
    </ListItem>
  );
};

export default TrophyListItem;
