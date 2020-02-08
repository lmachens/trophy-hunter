import App, { AppContext } from 'next/app';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { getApolloClient } from '../graphql/client';
import { AuthProvider } from '../auth/context';
import { getAuthToken } from '../auth/cookie';
import { queryMe } from '../auth/queries';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={getApolloClient(null)}>
      <AuthProvider initialUser={pageProps.me}>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
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
