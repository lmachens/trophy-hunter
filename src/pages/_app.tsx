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

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Trophy Hunter</title>
      </Head>
      <CacheProvider value={cache}>
        {globalStyles}
        <ApolloProvider client={getApolloClient(null)}>
          <AuthProvider initialUser={pageProps.me}>
            <OverwolfWindowProvider>
              <AppHeader />
              <Container>
                <Sidebar />
                <Component {...pageProps} />
              </Container>
            </OverwolfWindowProvider>
          </AuthProvider>
        </ApolloProvider>
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
