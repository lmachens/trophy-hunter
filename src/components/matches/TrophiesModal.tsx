import { FC, useState } from 'react';
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
import { TrophyProgress } from '../../api/matches';
import MatchStats from './MatchStats';
import Toggle from '../common/Toggle';

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
    grid-template-rows: auto auto 1fr auto;
    justify-items: center;
  }
`;

const Label = styled.label`
  margin: 8px 0px;
  font-family: 'Lato', sans-serif;
  justify-self: start;

  > * {
    margin-left: 12px;
  }
`;

interface TrophiesModalProps {
  onClose(): void;
  trophyNames: string[];
  allTrophiesProgress: TrophyProgress[];
}
const TrophiesModal: FC<TrophiesModalProps> = ({
  onClose,
  trophyNames,
  allTrophiesProgress,
}) => {
  const { account } = useAccount();
  const [showStats, setShowStats] = useState(false);

  return (
    <CenteredModal onClose={onClose}>
      <Title>
        {trophyNames.length === 0
          ? 'No trophies completed this match'
          : 'Trophies completed in this match, GG!'}
      </Title>
      <Label>
        Show stats
        <Toggle checked={showStats} onChange={() => setShowStats(!showStats)} />
      </Label>
      {!showStats && (
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
      )}
      {showStats && (
        <TrophyList>
          <MatchStats allTrophiesProgress={allTrophiesProgress} />
        </TrophyList>
      )}
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
