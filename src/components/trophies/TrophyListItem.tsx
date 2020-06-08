import { FC } from 'react';
import styled from '@emotion/styled';
import { Trophy } from './types';
import { useTrophyProgress } from '../../contexts/account';

interface ListItemProps {
  borderless?: boolean;
  island?: string;
}
const ListItem = styled.div<ListItemProps>`
  background: #2b2a30;
  height: 86px;
  margin-bottom: 4px;
  display: flex;
  border-top: ${(props) => (props.borderless ? 'none' : '1px solid #3f3e43')};
  background-image: url(${process.env.PUBLIC_DIR}/notifications/${(props) => props.island}.png);
  background-position: bottom right;
  background-repeat: no-repeat;
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
      <div>
        <h3>{trophy.title}</h3>
        <p>{trophy.description}</p>
      </div>
    </ListItem>
  );
};

export default TrophyListItem;
