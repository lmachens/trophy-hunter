import { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import Head from 'next/head';
import Router from 'next/router';
import { trackPageView } from '../api/performance';
import { AccountProvider } from '../contexts/account';
import GlobalStyles from '../styles/GlobalStyles';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    trackPageView(location.href);
  }, []);

  return (
    <>
      <Head>
        <title>Trophy Hunter</title>
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

Router.events.on('routeChangeComplete', (url) => {
  trackPageView(url);
});
