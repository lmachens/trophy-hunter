import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { handleContext } from './context';

let apolloClient: ApolloClient<unknown> | null = null;

const ssrMode = typeof window === 'undefined';
function createIsomorphLink(req) {
  if (ssrMode) {
    const { SchemaLink } = require('apollo-link-schema');
    const { schema } = require('./schema');
    const context = handleContext(req);
    return new SchemaLink({ schema, context });
  } else {
    const { HttpLink } = require('apollo-link-http');
    return new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin'
    });
  }
}

function createApolloClient(req) {
  const cache = new InMemoryCache().restore({});

  return new ApolloClient({
    link: createIsomorphLink(req),
    ssrMode,
    cache
  });
}

function initApolloClient(req) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (ssrMode) {
    return createApolloClient(req);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(req);
  }

  return apolloClient;
}

export function getApolloClient(req) {
  return apolloClient || initApolloClient(req);
}
