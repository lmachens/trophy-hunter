import { FC } from 'react';
import styled from '@emotion/styled';
import Trophy from './Trophy';
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

const TrophyWithBorder = styled(Trophy)`
  border-top: 1px solid #3f3e43;
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

interface IslandDetailsProps {
  activeIsland: IslandProps;
  onToggleClick(): void;
  open: boolean;
}

const IslandDetails: FC<IslandDetailsProps> = ({
  activeIsland,
  open,
  onToggleClick
}) => {
  let content;
  if (open && !activeIsland) {
    content = <ChooseALevel />;
  } else if (activeIsland) {
    content = (
      <>
        <img src="/combat-big.png" />
        <h3>{activeIsland.name} Lvl.1</h3>
        <List>
          <TrophyWithBorder />
          <TrophyWithBorder />
          <TrophyWithBorder />
          <TrophyWithBorder />
        </List>
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

export default IslandDetails;
