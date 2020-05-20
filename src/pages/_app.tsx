import { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/core';
import { cache } from 'emotion';
import { AppHeader } from '../components/headers';
import { Sidebar } from '../components/sidebar';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useState } from 'react';
import { ToolPane } from '../components/tools';
import { Settings } from '../components/settings';
import Collection from '../components/tools/collection';
import LevelPanel from '../components/levels/LevelPanel';
import Overview from '../components/trophies/Overview';
import { TargetLevel } from '../components/levels/types';
import { WelcomeGuide } from '../components/guides';
import { AccountProvider } from '../contexts/account';
import GlobalStyles from '../styles/GlobalStyles';

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
  display: flex;
  position: relative;
`;

function MyApp({ Component, pageProps }: AppProps) {
  const [activeTool, setActiveTool] = useState(null);
  const [targetLevel, setTargetLevel] = useState<TargetLevel>(null);
  const [visibleIslandDetails, setVisibleIslandDetails] = useState(false);

  return (
    <>
      <Head>
        <title>Trophy Hunter</title>
        <link
          href="https://fonts.googleapis.com/css?family=Lato|Roboto+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <CacheProvider value={cache}>
        <GlobalStyles />
        <AccountProvider>
          <AppHeader />
          <Container>
            <Sidebar
              activeTool={activeTool}
              onToolClick={(tool) => {
                setVisibleIslandDetails(null);
                setTargetLevel(null);
                setActiveTool(activeTool === tool ? null : tool);
              }}
            />
            <Main>
              <Component
                {...pageProps}
                targetLevel={targetLevel}
                onLevelClick={(targetLevel) => {
                  setActiveTool(null);
                  setTargetLevel(targetLevel);
                  setVisibleIslandDetails(true);
                }}
              />
              <LevelPanel
                level={targetLevel?.level}
                open={visibleIslandDetails}
                onToggleClick={() => {
                  setActiveTool(null);
                  if (visibleIslandDetails) {
                    setVisibleIslandDetails(false);
                    setTargetLevel(null);
                  } else {
                    setVisibleIslandDetails(true);
                  }
                }}
              />
              <Overview />
              {activeTool && (
                <ToolPane>
                  {activeTool === 'settings' && <Settings />}
                  {activeTool === 'collection' && <Collection />}
                </ToolPane>
              )}
              <WelcomeGuide
                visibleIslandDetails={visibleIslandDetails}
                targetLevel={targetLevel}
              />
            </Main>
          </Container>
        </AccountProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
