import { FC, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { Trophy } from './types';
import { useTrophyProgress } from '../../contexts/account';
import FavoritesFilter from '../icons/FavoritesFilter';
import Grow from '../common/Grow';
import ProgressBar from '../common/ProgressBar';
import { categoriesMap } from './categories';

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

const Favorite = styled(FavoritesFilter)`
  flex-shrink: 0;
  cursor: pointer;

  fill: ${(props: FavoriteProps) => (props.active ? '#77777A' : '#1F1F1F')};
  stroke: #77777a;

  &:hover {
    fill: #3f3e43;
  }
`;

const TrophyListItem: FC<TrophyListItemProps> = ({
  trophy,
  borderless,
  progress,
  ...props
}) => {
  const trophyProgress =
    typeof progress !== 'undefined' ? progress : useTrophyProgress(trophy);
  const ProgressIcon = categoriesMap[trophy.category].Icon;
  return (
    <ListItem borderless={borderless} {...props}>
      <Progress>
        <ProgressIcon progress={trophyProgress} />
      </Progress>
      <Grow>
        <h3>{trophy.title}</h3>
        <p>{trophy.description}</p>
        {trophy.maxProgress && (
          <ProgressBar progress={trophyProgress} max={trophy.maxProgress} />
        )}
      </Grow>
      {borderless && <Favorite active />}
    </ListItem>
  );
};

export default TrophyListItem;
