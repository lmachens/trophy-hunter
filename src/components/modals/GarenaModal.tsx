import { FC } from 'react';
import Modal from './Modal';
import styled from '@emotion/styled';
import Squid from '../icons/Squid';

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const Text = styled.p`
  text-align: center;
`;

interface GarenaModalProps {
  onClose(): void;
}

const GarenaModal: FC<GarenaModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose} title="Garena is not supported">
      <Container>
        <Text>
          We are very sorry, but Garena is not supported. There are technical
          restrictions, which make it impossible to access summoner and match
          data from Riot.
        </Text>
        <Squid />
      </Container>
    </Modal>
  );
};

export default GarenaModal;
