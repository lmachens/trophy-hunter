import { FC } from 'react';
import styled from '@emotion/styled';
import ChooseALevel from './ChooseALevel';
import DetailsToggle from './DetailsToggle';
import { Level } from './types';
import TrophyListItem from '../trophies/TrophyListItem';
import TrophyList from '../trophies/TrophyList';
import useAvailableTrophies from '../../contexts/account/useAvailableTrophies';

type Open = { open: boolean };

const Container = styled.aside<Open>`
  padding: 48px 0px 20px 0px;
  border-left: 1px solid #eaeaea;
  position: absolute;
  background: #2b2a30;
  width: 350px;
  transition: 0.4s;
  left: ${(props) => (props.open ? '-350px' : '0px')};
  height: 100%;
  top: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100%;
  margin: 0px 15px;
`;

const Title = styled.h3`
  margin-bottom: 12px;
`;

interface LevelPanelProps {
  level?: Level;
  onToggleClick(): void;
  open: boolean;
}

const LevelPanel: FC<LevelPanelProps> = ({ level, open, onToggleClick }) => {
  const availableTrophies = useAvailableTrophies();

  let content;
  if (open && !level) {
    content = <ChooseALevel />;
  } else if (level) {
    content = (
      <>
        <level.Icon />
        <Title>{level.title}</Title>
        <TrophyList>
          {level.trophies.map((trophy) => (
            <TrophyListItem
              key={trophy.name}
              trophy={trophy}
              disableFavorite={
                !availableTrophies.some(
                  (availableTrophy) => availableTrophy.name === trophy.name
                )
              }
              data-tooltip-id={trophy.name}
            />
          ))}
        </TrophyList>
      </>
    );
  }

  return (
    <Container open={open}>
      <DetailsToggle open={open} onClick={onToggleClick} />
      <Content>{content}</Content>
    </Container>
  );
};

export default LevelPanel;
