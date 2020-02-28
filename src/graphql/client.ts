import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import { HttpLink } from 'apollo-link-http';
import getConfig from 'next/config';
import { ApolloLink } from 'apollo-link';

let apolloClient: ApolloClient<unknown> | null = null;

const ssrMode = typeof window === 'undefined';

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const endpoint = ssrMode
  ? serverRuntimeConfig.ENDPOINT
  : publicRuntimeConfig.ENDPOINT;

function createIsomorphLink(ctx) {
  const authLink = new ApolloLink((operation, forward) => {
    if (ctx?.req) {
      operation.setContext({
        headers: ctx.req.headers
      });
    }
    return forward(operation);
  });

  return authLink.concat(
    new HttpLink({
      uri: endpoint,
      credentials: 'same-origin',
      fetch
    })
  );
}

function createApolloClient(ctx) {
  const cache = new InMemoryCache().restore({});

  return new ApolloClient({
    link: createIsomorphLink(ctx),
    ssrMode,
    cache
  });
}

function initApolloClient(ctx) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (ssrMode) {
    return createApolloClient(ctx);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(ctx);
  }

  return apolloClient;
}

export function getApolloClient(ctx) {
  return apolloClient || initApolloClient(ctx);
}
