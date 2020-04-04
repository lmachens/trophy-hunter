import { FC } from 'react';
import styled from '@emotion/styled';
import ChooseALevel from './ChooseALevel';
import DetailsToggle from './DetailsToggle';

type Open = { open: boolean };

const Container = styled.aside<Open>`
  padding-top: 48px;
  border-left: 1px solid #eaeaea;
  position: relative;
  background: #2b2a30;
  width: ${props => (props.open ? '350px' : '0px')};
  transition: 0.15s;
`;

const Content = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
`;

const List = styled.div`
  flex-grow: 1;
  overflow: auto;
  margin-bottom: 20px;
`;

type IslandProps = {
  name: string;
  top: number;
  left: number;
};

interface LevelDetailsProps {
  targetLevel: IslandProps;
  onToggleClick(): void;
  open: boolean;
}

const LevelDetails: FC<LevelDetailsProps> = ({
  targetLevel,
  open,
  onToggleClick
}) => {
  let content;
  if (open && !targetLevel) {
    content = <ChooseALevel />;
  } else if (targetLevel) {
    content = (
      <>
        <img src="/combat-big.png" />
        <h3>{targetLevel.name} Lvl.1</h3>
        <List>TBA</List>
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

export default LevelDetails;
