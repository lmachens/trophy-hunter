import { FC } from 'react';
import styled from '@emotion/styled';
import Modal, { ModalBody } from '../modals/Modal';
import TrophyList from '../trophies/TrophyList';
import * as trophies from '../trophies';
import Lottie from 'react-lottie';
import animationData from './confetti.json';
import Squid from '../icons/Squid';
import TrophyListItem from '../trophies/TrophyListItem';
import LottieContainer from './LottieContainer';
import FancyButton from '../common/FancyButton';
import { useAccount } from '../../contexts/account';

const ListItem = styled(TrophyListItem)`
  &:hover {
    background-color: #2b2a30;
  }
`;

const NoTropiesContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  place-items: center;
  height: 100%;
`;

const Title = styled.h3`
  margin: 20px;
  text-transform: uppercase;
`;

const CenteredModal = styled(Modal)`
  ${ModalBody} {
    display: grid;
    grid-template-rows: auto 1fr auto;
    justify-items: center;
  }
`;

interface TrophiesModalProps {
  onClose(): void;
  trophyNames: string[];
}
const TrophiesModal: FC<TrophiesModalProps> = ({ onClose, trophyNames }) => {
  const { account } = useAccount();
  return (
    <CenteredModal onClose={onClose}>
      <Title>
        {trophyNames.length === 0
          ? 'No trophies completed this match'
          : 'Trophies completed in this match, GG!'}
      </Title>
      <TrophyList>
        {trophyNames.map((trophyName) => (
          <ListItem
            account={account}
            trophy={trophies[trophyName]}
            key={trophyName}
          />
        ))}
        {trophyNames.length === 0 && (
          <NoTropiesContainer>
            <p>Oh well, keep on going and you&apos;ll get them next time!</p>
            <Squid />
          </NoTropiesContainer>
        )}
      </TrophyList>
      {trophyNames.length > 0 && (
        <LottieContainer>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={500}
            width={666}
          />
        </LottieContainer>
      )}
      <FancyButton onClick={onClose}>Continue</FancyButton>
    </CenteredModal>
  );
};

export default TrophiesModal;
