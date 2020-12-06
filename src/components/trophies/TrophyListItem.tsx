import { FC, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { Trophy } from './types';
import { useTrophyProgress, useAccount } from '../../contexts/account';
import FavoritesFilter from '../icons/FavoritesFilter';
import Grow from '../common/Grow';
import ProgressBar from '../common/ProgressBar';
import { categoriesMap } from './categories';
import { queryCache, useMutation } from 'react-query';
import { patchAccount } from '../../api/accounts';
import { toggleArrayElement } from '../../api/utils/arrays';
import Flag from '../icons/Flag';
import { Tooltip } from '../tooltip';
import TrophyStats from './TrophyStats';

interface ListItemProps {
  borderless?: boolean;
  island?: string;
}
const ListItem = styled.div<ListItemProps>`
  background-color: #2b2a30;
  padding: 10px;
  margin-bottom: 4px;
  display: flex;
  border-top: ${(props) => (props.borderless ? 'none' : '1px solid #3f3e43')};

  &:hover {
    background-color: #3e3d42;
  }
`;

interface TrophyListItemProps
  extends ListItemProps,
    HTMLAttributes<HTMLDivElement> {
  trophy: Trophy;
  disableFavorite?: boolean;
  progress?: number;
}

const Progress = styled.div`
  margin: 6px 10px 6px 6px;
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
  trophy,
  borderless,
  progress,
  disableFavorite,
  ...props
}) => {
  if (!trophy) {
    return null;
  }

  const { account } = useAccount();
  const [patch] = useMutation(patchAccount, {
    onSuccess: () => {
      queryCache.invalidateQueries('account');
    },
  });
  const { progress: trophyProgress, progressDetails } =
    typeof progress !== 'undefined'
      ? { progress, progressDetails: null }
      : useTrophyProgress(trophy);
  const ProgressIcon = categoriesMap[trophy.category].Icon;
  return (
    <ListItem borderless={borderless} {...props}>
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
          <trophy.ProgressDetails details={progressDetails} />
        )}
      </Grow>
      {!trophy.checkLive && (
        <Tooltip
          text="This trophy doesn't have live-progress tracking"
          placement="bottomRight"
        >
          <Flag />
        </Tooltip>
      )}
      {!disableFavorite && account && trophyProgress < 1 && (
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
          }}
        />
      )}
    </ListItem>
  );
};

export default TrophyListItem;
