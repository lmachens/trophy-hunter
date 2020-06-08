import { FC } from 'react';
import styled from '@emotion/styled';
import { Trophy } from './types';
import { useTrophyProgress } from '../../contexts/account';
import FavoritesFilter from '../icons/FavoritesFilter';
import Grow from '../common/Grow';

interface ListItemProps {
  borderless?: boolean;
  island?: string;
}
const ListItem = styled.div<ListItemProps>`
  background: #2b2a30;
  padding: 10px;
  margin-bottom: 4px;
  display: flex;
  border-top: ${(props) => (props.borderless ? 'none' : '1px solid #3f3e43')};
  background-image: url(${process.env.PUBLIC_DIR}/notifications/${(props) => props.island}.png);
  background-position: bottom right;
  background-repeat: no-repeat;

  &:hover {
    background: #3e3d42;
  }
`;

interface TrophyListItemProps extends ListItemProps {
  trophy: Trophy;
  progress?: number;
  background?: boolean;
}

const Progress = styled.div`
  margin: 6px 10px 6px 6px;
  flex-shrink: 0;
  width: 12px;
`;

const Favorite = styled(FavoritesFilter)`
  flex-shrink: 0;
  cursor: pointer;
`;

const TrophyListItem: FC<TrophyListItemProps> = ({
  trophy,
  borderless,
  progress,
  background,
  ...props
}) => {
  const trophyProgress =
    typeof progress !== 'undefined' ? progress : useTrophyProgress(trophy);

  return (
    <ListItem
      borderless={borderless}
      island={background ? trophy.island : null}
      {...props}
    >
      <Progress>
        <trophy.ProgressIcon progress={trophyProgress} />
      </Progress>
      <Grow>
        <h3>{trophy.title}</h3>
        <p>{trophy.description}</p>
      </Grow>
      {borderless && <Favorite />}
    </ListItem>
  );
};

export default TrophyListItem;
