import { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/core';
import { cache } from 'emotion';
import Head from 'next/head';

import { AccountProvider } from '../contexts/account';
import GlobalStyles from '../styles/GlobalStyles';
import { OverwolfProvider } from '../contexts/overwolf';

function MyApp({ Component, pageProps }: AppProps) {
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
          <OverwolfProvider>
            <Component {...pageProps} />
          </OverwolfProvider>
        </AccountProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
