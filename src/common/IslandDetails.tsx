import { FC, useState, HTMLAttributes, useEffect } from 'react';
import styled from '@emotion/styled';
import Trophy from './Trophy';

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
`;

const ToggleContainer = styled.div`
  position: absolute;
  left: -30px;
  top: calc(50% - 20px);
  height: 40px;
  width: 30px;
  border: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b2a30;
  cursor: pointer;
`;

const TrophyWithBorder = styled(Trophy)`
  border-top: 1px solid #3f3e43;
`;

const List = styled.div`
  flex-grow: 1;
  overflow: auto;
  margin-bottom: 20px;
`;

interface ToggleProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
}

const Toggle: FC<ToggleProps> = ({ open, onClick }) => {
  return (
    <ToggleContainer onClick={onClick}>
      <svg
        width="7"
        height="12"
        viewBox="0 0 7 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {open ? (
          <path
            d="M7 6.00024L-1.00137e-06 12L-4.76837e-07 -3.0598e-07L7 6.00024Z"
            fill="#EAEAEA"
          />
        ) : (
          <path
            d="M-2.62279e-07 5.99976L7 -3.0598e-07L7 12L-2.62279e-07 5.99976Z"
            fill="#EAEAEA"
          />
        )}
      </svg>
    </ToggleContainer>
  );
};

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
    content = <div>Choose a level</div>;
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
      <Toggle
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
