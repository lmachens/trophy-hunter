import { FC, useState, useEffect } from 'react';
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

interface IslandDetailsProps {
  island: {
    name: string;
    top: number;
    left: number;
  };
  onHide(): void;
}

const IslandDetails: FC<IslandDetailsProps> = ({ island, onHide }) => {
  const [open, setOpen] = useState(Boolean(island));

  useEffect(() => {
    setOpen(Boolean(island));
  }, [island]);

  let content;
  if (open && !island) {
    content = <ChooseALevel />;
  } else if (island) {
    content = (
      <>
        <img src="/combat-big.png" />
        <h3>{island.name} Lvl.1</h3>
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
      <DetailsToggle
        open={open}
        onClick={() => {
          if (open) {
            onHide();
          }
          setOpen(!open);
        }}
      />
      <Content>{content}</Content>
    </Container>
  );
};

export default IslandDetails;
