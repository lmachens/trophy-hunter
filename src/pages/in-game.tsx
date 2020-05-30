import { NextPage } from 'next';
import { InGameHeader } from '../components/headers';
import styled from '@emotion/styled';
import AvailableTrophies from '../components/trophies/AvailableTrophies';
import { VideoAds } from '../components/ads';
import Grow from '../components/common/Grow';
import SpecialProgress from '../components/trophies/special/SpecialProgress';
import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { keyframes } from '@emotion/core';
import overwolf from '../api/overwolf';
import useHotkey from '../hooks/useHotkey';

const ConnectionStatus = styled.div`
  margin-top: 48px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ConnectionProgress = styled(SpecialProgress)`
  width: 23px;
  height: 62px;
  opacity: ${(props) => (props.progress === 1 ? 0 : 1)};
  transform: ${(props) =>
    props.progress === 1 ? 'translateY(-20px) scale(0.5)' : 'none'};
  transition: opacity 2s, transform 2s;
`;

const Status = styled.div<{
  progress: number;
}>`
  opacity: ${(props) => (props.progress === 1 ? 0 : 1)};
  transform: ${(props) =>
    props.progress === 1 ? 'translateY(-20px)' : 'none'};
  transition: opacity 2s, transform 2s;
`;

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.2rem);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

const Motivation = styled.div`
  font-size: 1.2rem;
  overflow: hidden;
`;

const Appear = styled.div`
  animation: ${appear} ease 2s 1;
  animaton-delay: 1s;
`;

const InGame: NextPage = () => {
  const hotkey = useHotkey();
  const [progress, setProgress] = useState(0);
  const [showConnectionStatus, setShowConnectionStatus] = useState(true);

  useEffect(() => {
    if (progress === 1) {
      const timeoutId = setTimeout(() => {
        setShowConnectionStatus(false);
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }

    const timeoutId = setTimeout(() => {
      setProgress(Math.min(1, progress + 0.25));
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [progress]);

  return (
    <Container>
      <InGameHeader />
      <ConnectionStatus>
        {showConnectionStatus ? (
          <>
            <ConnectionProgress progress={progress} />
            <Status progress={progress}>
              {progress < 1 ? 'Connecting to match' : 'Connected'}
            </Status>
          </>
        ) : (
          <>
            <Motivation>
              <Appear>GO GET THEM ALL!</Appear>
            </Motivation>
            <div>
              Hit {hotkey} or{' '}
              <Button
                onClick={() =>
                  overwolf.windows.getCurrentWindow((result) => {
                    overwolf.windows.minimize(result.window.id);
                  })
                }
              >
                Click here
              </Button>{' '}
              to minimize
            </div>
          </>
        )}
      </ConnectionStatus>
      <Grow>
        <AvailableTrophies />
      </Grow>
      <VideoAds />
    </Container>
  );
};

export default InGame;
