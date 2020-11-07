import { FC } from 'react';
import styled from '@emotion/styled';
import Modal from '../modals/Modal';
import TrophyList from '../trophies/TrophyList';
import * as trophies from '../trophies';
import Lottie from 'react-lottie';
import animationData from './confetti.json';
import Squid from '../icons/Squid';
import TrophyListItem from '../trophies/TrophyListItem';
import LottieContainer from './LottieContainer';

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

interface TrophiesModalProps {
  onClose(): void;
  trophyNames: string[];
}
const TrophiesModal: FC<TrophiesModalProps> = ({ onClose, trophyNames }) => {
  return (
    <Modal
      onClose={onClose}
      title={
        trophyNames.length === 0
          ? 'No trophies completed this match'
          : 'Trophies completed in this match, GG!'
      }
    >
      <TrophyList>
        {trophyNames.map((trophyName) => (
          <ListItem trophy={trophies[trophyName]} key={trophyName} />
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
    </Modal>
  );
};

export default TrophiesModal;
