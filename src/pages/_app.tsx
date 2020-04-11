import App, { AppContext } from 'next/app';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { getApolloClient } from '../graphql/client';
import { AuthProvider } from '../auth/provider';
import { getAuthToken } from '../auth/authToken';
import { queryMe } from '../auth/queries';
import { CacheProvider } from '@emotion/core';
import { globalStyles } from '../styles/global';
import { cache } from 'emotion';
import AppHeader from '../common/AppHeader';
import { OverwolfWindowProvider } from '../overwolf/OverwolfWindow';
import Sidebar from '../common/Sidebar';
import styled from '@emotion/styled';
import Head from 'next/head';
import Main from '../common/Main';
import { useState } from 'react';
import ToolPane from '../common/ToolPane';
import Settings from '../common/Settings';
import Collection from '../common/Collection';
import LevelPanel from '../components/levels/LevelPanel';
import Overview from '../common/Overview';
import { TargetLevel } from '../components/levels/types';
import { playstyle } from '../components/trophies/hub';
import { WelcomeGuide } from '../components/guides';
import { UserProvider } from '../contexts/user';

const Container = styled.div`
  display: flex;
  height: 100vh;
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
        {globalStyles}
        <UserProvider>
          <OverwolfWindowProvider>
            <AppHeader />
            <Container>
              <Sidebar
                activeTool={activeTool}
                onToolClick={tool => {
                  setVisibleIslandDetails(null);
                  setTargetLevel(null);
                  setActiveTool(activeTool === tool ? null : tool);
                }}
              />
              <Main>
                <Component
                  {...pageProps}
                  top={targetLevel?.top}
                  left={targetLevel?.left}
                  onLevelClick={targetLevel => {
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
          </OverwolfWindowProvider>
        </UserProvider>
      </CacheProvider>
    </>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const apolloClient = getApolloClient(appContext.ctx);
  appContext.ctx.apolloClient = apolloClient;

  const authToken = getAuthToken(appContext.ctx);

  const appProps = await App.getInitialProps(appContext);
  appProps.pageProps.authToken = authToken;

  if (authToken) {
    const me = await queryMe(apolloClient);
    appProps.pageProps.me = me;
  }

  return { ...appProps };
};

export default MyApp;
