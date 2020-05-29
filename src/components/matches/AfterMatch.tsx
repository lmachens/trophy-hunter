import styled from '@emotion/styled';
import { FC, useState, useEffect } from 'react';
import Backdrop from '../common/Backdrop';
import SandClock from '../icons/SandClock';
import Modal from '../modals/Modal';
import TrophyListItem from '../trophies/TrophyListItem';
import { Tooltip } from '../tooltip';
import ModalButton from '../modals/ModalButton';
import Button from '../common/Button';
import { keyframes } from '@emotion/core';
import TrophyList from '../trophies/TrophyList';
import {
  LEAGUE_LAUNCHER_ID,
  addLeagueLauncherListener,
  setLeagueLauncherFeatures,
} from '../../api/overwolf';
import { postCheck } from '../../api/accounts';
import { queryCache, useMutation } from 'react-query';
import * as trophies from '../trophies';

const sandClockMotion = keyframes`
  from {
    transform: rotateZ(0deg);
  }

  80% {
    transform: rotateZ(0deg);
  }

  to {
    transform: rotateZ(180deg);
  }
`;

const sandMotion1 = keyframes`
  from {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  to {
    opacity: 0;
  }
`;

const sandMotion2 = keyframes`
  from {
    opacity: 0;
  }

  50%: {
    opacity: 1;
  }

  80% {
    opacity: 0;
  }

  to {
    opacity: 0;
  }
`;

const sandMotion3 = keyframes`
  from {
    opacity: 0;
  }

  50$ {
    opacity: 0;
  }

  80% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translate3d(0,0,0);
  }

  40% {
    transform: translate3d(0, -4px, 0);
  }

  60% {
    transform: translate3d(0, -2px, 0);
  }
`;

const AnimatedSandClock = styled(SandClock)<{ loading: boolean }>`
  animation: ${(props) => (props.loading ? sandClockMotion : bounce)} 2s ease
    infinite;

  > .frame-1 {
    opacity: 0;
    animation: ${(props) => (props.loading ? sandMotion1 : 'none')} 2s ease
      infinite;
  }

  > .frame-2 {
    opacity: 0;
    animation: ${(props) => (props.loading ? sandMotion2 : 'none')} 2s ease
      infinite;
  }

  > .frame-3 {
    animation: ${(props) => (props.loading ? sandMotion3 : 'none')} 2s ease
      infinite;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > * {
    margin: 10px;
  }
`;

const Message = styled.div`
  text-transform: uppercase;
  font-family: Roboto Mono;
  font-size: 1.2rem;
`;

interface AfterMatchProps {
  className?: string;
}

const ButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 15px 10px 10px;
`;

const INTERESTED_IN_LAUNCHER_FEATURES = ['end_game'];

const AfterMatch: FC<AfterMatchProps> = ({ className }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [check, { data: match, status, reset }] = useMutation(postCheck, {
    onSuccess: () => {
      queryCache.refetchQueries('account');
    },
  });
  const loading = status === 'loading';

  useEffect(() => {
    const handleOnLaunched = () => {
      setTimeout(() => {
        setLeagueLauncherFeatures(INTERESTED_IN_LAUNCHER_FEATURES);
      }, 1000);
    };

    addLeagueLauncherListener(handleOnLaunched);

    const handleInfoUpdate = (infoUpdate) => {
      if (
        infoUpdate.launcherClassId !== LEAGUE_LAUNCHER_ID ||
        infoUpdate.feature !== 'end_game'
      ) {
        return;
      }

      try {
        const endGameStats = JSON.parse(
          infoUpdate.info.end_game_lol.lol_end_game_stats
        );
        const { gameId } = endGameStats;
        setShowTooltip(true);
        setShowModal(true);
        check(gameId);
      } catch (error) {
        console.error(error);
      }
    };

    overwolf.games.launchers.events.onInfoUpdates.addListener(handleInfoUpdate);
  }, []);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setShowTooltip(true);
      setShowModal(false);
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loading]);

  return (
    <>
      {!match && !loading && (
        <Button
          onClick={() => {
            setShowModal(true);
            check(4625869335);
          }}
        >
          Load match
        </Button>
      )}
      {(loading || match) && (
        <AnimatedSandClock
          className={className}
          data-tooltip-id="sandClock"
          onClick={() => setShowModal(true)}
          loading={loading}
        />
      )}
      {!showModal && showTooltip && (
        <Tooltip
          title={loading ? 'Loading Trophies...' : 'Trophies are ready!'}
          onClick={() => setShowTooltip(false)}
          text={
            loading ? (
              'It may take a few moments.. we’re loading and concluding your last match to show your progress.'
            ) : (
              <>
                <div>All set, want to see the progress you’ve made?</div>
                <ButtonContainer>
                  <ModalButton onClick={() => setShowModal(true)}>
                    Check now!
                  </ModalButton>
                </ButtonContainer>
              </>
            )
          }
          placement="topLeft"
          targetId="sandClock"
          pointerEvents
        />
      )}
      {showModal && loading && (
        <Backdrop onClick={() => setShowModal(false)}>
          <Container>
            <img src={`${process.env.PUBLIC_DIR}/logo.png`} />
            <Message>Loading Trophies...</Message>
          </Container>
        </Backdrop>
      )}
      {showModal && match && (
        <Modal
          onClose={() => {
            setShowTooltip(false);
            setShowModal(false);
            reset();
          }}
          title="Trophies completed in this match, GG!"
        >
          <TrophyList>
            {match.trophyNames.map((trophyName) => (
              <TrophyListItem
                trophy={trophies[trophyName]}
                key={trophyName}
                borderless
              />
            ))}
          </TrophyList>
        </Modal>
      )}
    </>
  );
};

export default AfterMatch;
