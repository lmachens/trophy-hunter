import { FC } from 'react';
import styled from '@emotion/styled';

const List = styled.div`
  flex-grow: 1;
  overflow: auto;
  margin-bottom: 20px;
`;

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

const AvailableTrophies: FC = () => {
  return (
    <>
      <h3>Available Trophies</h3>
      <List>
        <ListItem>
          <CategoryIcon src="/combat.png" />
          <div>
            <div>Key Targets</div>
            <small>
              Achieve three kills on the opponent with the highest amount of
              gold in the game at that point.
            </small>
          </div>
        </ListItem>
        <ListItem>
          <CategoryIcon src="/combat.png" />
          <div>
            <div>Key Targets</div>
            <small>
              Achieve three kills on the opponent with the highest amount of
              gold in the game at that point.
            </small>
          </div>
        </ListItem>
        <ListItem>
          <CategoryIcon src="/combat.png" />
          <div>
            <div>Key Targets</div>
            <small>
              Achieve three kills on the opponent with the highest amount of
              gold in the game at that point.
            </small>
          </div>
        </ListItem>
        <ListItem>
          <CategoryIcon src="/combat.png" />
          <div>
            <div>Key Targets</div>
            <small>
              Achieve three kills on the opponent with the highest amount of
              gold in the game at that point.
            </small>
          </div>
        </ListItem>
        <ListItem>
          <CategoryIcon src="/combat.png" />
          <div>
            <div>Key Targets</div>
            <small>
              Achieve three kills on the opponent with the highest amount of
              gold in the game at that point.
            </small>
          </div>
        </ListItem>
        <ListItem>
          <CategoryIcon src="/combat.png" />
          <div>
            <div>Key Targets</div>
            <small>
              Achieve three kills on the opponent with the highest amount of
              gold in the game at that point.
            </small>
          </div>
        </ListItem>
        <ListItem>
          <CategoryIcon src="/combat.png" />
          <div>
            <div>Key Targets</div>
            <small>
              Achieve three kills on the opponent with the highest amount of
              gold in the game at that point.
            </small>
          </div>
        </ListItem>
        <ListItem>
          <CategoryIcon src="/combat.png" />
          <div>
            <div>Key Targets</div>
            <small>
              Achieve three kills on the opponent with the highest amount of
              gold in the game at that point.
            </small>
          </div>
        </ListItem>
      </List>
    </>
  );
};

export default AvailableTrophies;
