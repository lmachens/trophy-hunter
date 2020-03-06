import { FC, HTMLAttributes } from 'react';
import styled from '@emotion/styled';

const ListItem = styled.div`
  background: #2b2a30;
  height: 86px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
`;

const CategoryIcon = styled.img`
  margin: 10px;
  height: 40px;
  width: 22px;
`;

const Trophy: FC<HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <ListItem {...props}>
      <CategoryIcon src="/combat.png" />
      <div>
        <div>Key Targets</div>
        <small>
          Achieve three kills on the opponent with the highest amount of gold in
          the game at that point.
        </small>
      </div>
    </ListItem>
  );
};

export default Trophy;
