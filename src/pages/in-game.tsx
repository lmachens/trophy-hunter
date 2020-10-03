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
import useHotkey from '../hooks/useHotkey';
import overwolf from '../api/overwolf';
import usePersistentState from '../hooks/usePersistentState';
import Head from 'next/head';
import { log } from '../api/logs';
import { PROGRESS, TROPHY_PROGRESS } from '../api/overwolf/live';

overwolf.extensions.current.getManifest((manifest) =>
  log(`Running v${manifest.meta.version}`)
);

const ConnectionStatus = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: 48px 20px 20px 20px;
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
`;

const GrowFlex = styled(Grow)`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const InGame: NextPage = () => {
  const hotkey = useHotkey('show_trophy_hunter');
  const [progress] = usePersistentState(PROGRESS, 0);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [trophyProgress] = usePersistentState<{ [trophyName: string]: number }>(
    TROPHY_PROGRESS,
    {}
  );
  useEffect(() => {
    if (progress !== 1) {
      return;
    }
    let timeoutId = setTimeout(() => {
      setConnectionStatus('connected');
      timeoutId = setTimeout(() => {
        setConnectionStatus('done');
      }, 2000);
    }, 2000);
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
        <InGameHeader />
        {connectionStatus !== 'done' && (
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
        )}
        <GrowFlex>
          <AvailableTrophies trophyProgress={trophyProgress} />
        </GrowFlex>
        <VideoAds showIngame={true} />
      </Container>
    </>
  );
};

export default InGame;
