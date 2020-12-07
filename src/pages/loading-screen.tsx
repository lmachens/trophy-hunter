import { NextPage } from 'next';
import { LoadingScreenHeader } from '../components/headers';
import styled from '@emotion/styled';
import { VideoAds } from '../components/ads';
import SpecialProgress from '../components/trophies/special/SpecialProgress';
import { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { keyframes } from '@emotion/react';
import useHotkey from '../hooks/useHotkey';
import {
  closeCurrentWindow,
  getVersion,
  toggleInGameWindow,
} from '../api/overwolf';
import usePersistentState from '../hooks/usePersistentState';
import Head from 'next/head';
import { log } from '../api/logs';
import { PROGRESS } from '../api/overwolf/live';

getVersion().then((version) => log(`Running v${version}`));

const ConnectionStatus = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const Container = styled.div`
  padding: 48px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #1f1f1f;
  align-items: center;
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
`;

const LoadingScreen: NextPage = () => {
  const hotkey = useHotkey('show_trophy_hunter');
  const [progress] = usePersistentState(PROGRESS, 0);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  useEffect(() => {
    if (progress !== 1) {
      return;
    }
    const timeoutId = setTimeout(() => {
      setConnectionStatus('connected');
    }, 1500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [progress]);

  return (
    <>
      <Head>
        <title>Trophy Hunter - In-Game</title>
      </Head>
      <Container>
        <LoadingScreenHeader />
        <ConnectionStatus>
          {connectionStatus === 'connecting' ? (
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
                  onClick={async () => {
                    await toggleInGameWindow();
                    await closeCurrentWindow();
                  }}
                >
                  Click here
                </Button>{' '}
                to start
              </div>
            </>
          )}
        </ConnectionStatus>
        <VideoAds showIngame={true} />
      </Container>
    </>
  );
};

export default LoadingScreen;
