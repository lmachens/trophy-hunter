import Modal from './Modal';
import styled from '@emotion/styled';
import FancyButton from '../common/FancyButton';
import Squid from '../icons/Squid';
import TrophyList from '../trophies/TrophyList';
import TrophyListItem from '../trophies/TrophyListItem';
import { Account } from '../../api/accounts';
import * as trophies from '../trophies';

const Container = styled.div`
  display: grid;
  place-items: center;
  align-items: initial;
  height: 100%;
  grid-template-rows: auto 1fr auto;

  p {
    margin: 0.4em 0;
  }
  section {
    text-align: center;
  }
`;

const NoTropiesContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  height: 100%;
`;

interface MissionsModalProps {
  account: Account;
  onClose(): void;
}

const Title = styled.h3`
  margin: 20px;
  text-transform: uppercase;
`;

const ListItem = styled(TrophyListItem)`
  &:hover {
    background-color: #2b2a30;
  }
`;

const MissionsModal = ({ account, onClose }: MissionsModalProps) => {
  const missionTrophyNames = account
    ? account.missions.reduce(
        (acc, mission) => [...mission.completedTrophyNames, ...acc],
        []
      )
    : [];
  return (
    <Modal onClose={onClose}>
      <Container>
        <Title>Completed missions</Title>
        <TrophyList>
          {missionTrophyNames.map((trophyName) => (
            <ListItem
              account={account}
              trophy={trophies[trophyName]}
              key={trophyName}
            />
          ))}
          {missionTrophyNames.length === 0 && (
            <NoTropiesContainer>
              <p>Oh well, keep on going and you&apos;ll get them next time!</p>
              <Squid />
            </NoTropiesContainer>
          )}
        </TrophyList>
        <FancyButton onClick={onClose}>Close</FancyButton>
      </Container>
    </Modal>
  );
};

export default MissionsModal;
