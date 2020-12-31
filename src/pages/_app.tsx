import { AppProps } from 'next/app';
import { CacheProvider } from '@emotion/react';
import { cache } from '@emotion/css';
import Head from 'next/head';
import { AccountProvider } from '../contexts/account';
import GlobalStyles from '../styles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Trophy Hunter</title>
      </Head>
      <CacheProvider value={cache}>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <AccountProvider>
            <Component {...pageProps} />
          </AccountProvider>
        </QueryClientProvider>
      </CacheProvider>
    </>
  );
}

export default MyApp;
