import { FC } from 'react';
import styled from '@emotion/styled';
import ChooseALevel from './ChooseALevel';
import DetailsToggle from './DetailsToggle';
import { Level } from './types';
import TrophyListItem from '../trophies/TrophyListItem';
import TrophyList from '../trophies/TrophyList';

type Open = { open: boolean };

const Container = styled.aside<Open>`
  padding-top: 48px;
  border-left: 1px solid #eaeaea;
  position: relative;
  background: #2b2a30;
  width: ${(props) => (props.open ? '350px' : '0px')};
  transition: 0.4s;
`;

const Content = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  max-height: 100%;
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
