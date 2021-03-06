/* eslint-disable */

import 'next';
import ApolloClient from 'apollo-boost';

declare module 'next' {
  export interface NextPageContext {
    apolloClient: ApolloClient<unknown>;
  }

  export interface AppPropsType {
    apolloClient: any;
  }
}
