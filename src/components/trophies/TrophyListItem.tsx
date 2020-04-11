import { FC } from 'react';
import styled from '@emotion/styled';
import { Trophy } from './types';
import TrophyProgressIcon from './TrophyProgressIcon';

interface ListItemProps {
  borderless?: boolean;
}
const ListItem = styled.div<ListItemProps>`
  background: #2b2a30;
  height: 86px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  border-top: ${props => (props.borderless ? 'none' : '1px solid #3f3e43')};
`;

interface TrophyListItemProps extends ListItemProps {
  trophy: Trophy;
}

const TrophyListItem: FC<TrophyListItemProps> = ({
  trophy,
  borderless,
  ...props
}) => {
  return (
    <ListItem borderless={borderless} {...props}>
      <TrophyProgressIcon />
      <div>
        <h3>{trophy.title}</h3>
        <p>{trophy.description}</p>
      </div>
    </ListItem>
  );
};

export default TrophyListItem;
