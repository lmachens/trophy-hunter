import { FC } from 'react';
import Modal from './Modal';
import styled from '@emotion/styled';
import HappySquid from '../icons/HappySquid';
import FancyButton from '../common/FancyButton';
import LeaderboardIcon from '../icons/Leaderboard';
import MapIcon from '../icons/Map';
import NavIconButton from '../common/NavIconButton';

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
`;

const Text = styled.p`
  text-align: center;
`;

interface SeasonModalProps {
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
const IconButton = styled(NavIconButton)`
  border: none;
  background: #616165;
`;

const SeasonModal: FC<SeasonModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <Container>
        <TitleContainer>
          <h3>New season reset </h3>
          <IconButton>
            <MapIcon />
          </IconButton>
          <IconButton>
            <LeaderboardIcon />
          </IconButton>
        </TitleContainer>
        <Text>
          The new League of Legends season 11 is started. Leaderboards and
          trophy progress were reset.
        </Text>
        <HappySquid />
        <FancyButton onClick={onClose}>Got it</FancyButton>
      </Container>
    </Modal>
  );
};

export default SeasonModal;
