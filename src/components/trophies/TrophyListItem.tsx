import { FC } from 'react';
import styled from '@emotion/styled';
import { Trophy } from './types';
import TrophyProgressIcon from './TrophyProgressIcon';

const ListItem = styled.div`
  background: #2b2a30;
  height: 86px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`;

interface TrophyListItemProps {
  trophy: Trophy;
}

const TrophyListItem: FC<TrophyListItemProps> = ({ trophy }) => {
  return (
    <ListItem>
      <TrophyProgressIcon />
      <div>
        <h3>{trophy.title}</h3>
        <p>{trophy.description}</p>
      </div>
    </ListItem>
  );
};

export default TrophyListItem;
