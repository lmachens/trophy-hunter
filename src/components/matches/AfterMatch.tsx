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
import { postCheck } from '../../api/accounts';
import { queryCache, useMutation } from 'react-query';
import * as trophies from '../trophies';
import Lottie from 'react-lottie';
import animationData from './confetti.json';
import { bounce } from '../../styles/animations';
import Squid from '../icons/Squid';

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

const LottieContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
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

const ListItem = styled(TrophyListItem)`
  &:hover {
    background-color: #2b2a30;
  }
`;

const NoTropiesContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const AfterMatch: FC<AfterMatchProps> = ({ className }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [check, { data: match, status, reset }] = useMutation(postCheck, {
    onMutate: () => {
      setShowModal(true);
    },
    onSuccess: () => {
      localStorage.removeItem('checkGameId');
      queryCache.invalidateQueries('account');
    },
  });
  const loading = status === 'loading';

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== 'checkGameId' || !event.newValue) {
        return;
      }
      check(parseInt(event.newValue));
    };
    window.addEventListener('storage', handleStorage, false);

    const oldCheckGameId = localStorage.getItem('checkGameId');
    if (oldCheckGameId) {
      check(parseInt(oldCheckGameId));
    }
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
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
            check(4642134839);
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
          title={
            match.trophyNames.length === 0
              ? 'No trophies completed this match'
              : 'Trophies completed in this match, GG!'
          }
        >
          <TrophyList>
            {match.trophyNames.map((trophyName) => (
              <ListItem trophy={trophies[trophyName]} key={trophyName} />
            ))}
            {match.trophyNames.length === 0 && (
              <NoTropiesContainer>
                <Squid />
              </NoTropiesContainer>
            )}
          </TrophyList>
          {match.trophyNames.length > 0 && (
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
      )}
    </>
  );
};

export default AfterMatch;
