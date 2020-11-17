import { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import Head from 'next/head';

import { AccountProvider } from '../contexts/account';
import GlobalStyles from '../styles/GlobalStyles';

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
          <Component {...pageProps} />
        </AccountProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
