import { FC } from 'react';
import Modal from './Modal';
import styled from '@emotion/styled';
import FancyButton from '../common/FancyButton';

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const Text = styled.p`
  text-align: center;
`;

interface ARAMModalProps {
  onClose(): void;
}

const TitleContainer = styled.div`
  display: grid;
  column-gap: 5px;
  grid-template-columns: auto auto auto;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 24px;
    text-transform: uppercase;
  }
`;

const ARAMModal: FC<ARAMModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <TitleContainer>
          <h3>We now support ARAM!</h3>
        </TitleContainer>
        <Text>
          Some trophies can now be completed in ARAM mode as well, look for the
          ARAM icon and GLHF :)
        </Text>
        <img src="/aram.png" alt="ARAM example" />
        <FancyButton onClick={onClose}>Got it</FancyButton>
      </Container>
    </Modal>
  );
};

export default ARAMModal;
